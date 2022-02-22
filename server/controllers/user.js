const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken') 

const User = require('../models/user'); 

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10) 
    .then(hash => {                  
        const userEmail = req.body.email
        const userPassword = hash
        const userName = req.body.name
        const sqlInsert = "INSERT INTO users (userEmail, userPassword, userName) VALUES (?,?,?)";
        db.query(sqlInsert, [userEmail, userPassword, userName], (err, result) =>{
            console.log(result)
        })
      })
    .catch(error => res.status(500).json({ error }))
}



exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(    
              { userId: user._id, },
              'RANDOM_TOKEN_SECRET', 
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};