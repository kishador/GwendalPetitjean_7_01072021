const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
      const token = req.headers.authorization
      if (!token) {
        res.send("need token")
      }
    else{
      jwt.verify(token, `${process.env.JWT_KEY}`, (err, decodedToken) =>{
        if(err) {
          res.json({message: "failed to auth" })
        }
        else {
          res.json({userId : decodedToken }) 
        }
      })
      next()
    }} 