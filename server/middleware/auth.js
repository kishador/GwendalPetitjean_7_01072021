const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.users

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
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
