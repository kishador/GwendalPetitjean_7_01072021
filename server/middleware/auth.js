const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.users

module.exports = async (req, res, next) => {
	try {
console.log(req.body)
		const token = req.headers.authorization;
		const decodedToken = jwt.verify(token, "jwtSecret");
    console.log(decodedToken)
		const user = await User.findOne({ where: { id: decodedToken.id } });
		if (!user) {
			throw new Error("invalid");
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({ error: "A token must be provided" });
	}
};
