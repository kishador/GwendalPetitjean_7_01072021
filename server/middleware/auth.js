const User = require ('../models/user.js')
const jwt = require ('jsonwebtoken')

/* Protéger les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes */
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET_KEY')
        const user = await User.findOne({ where: {
            id: decodedToken.id }
        })
        if (! user) {
            throw new Error
        }
        req.user = user
        next()
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}
module.exports = auth