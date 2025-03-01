const blacklistModel = require('../models/blacklistModel.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model.js');


module.exports.authUser = async (req, res, next) => {
	const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			message: 'token not found (Unauthorized)'
		})
	}

	const isBlacklisted = await userModel.findOne({ token: token });

	if (isBlacklisted) {
		return res.status(401).json({
			message: "Unauthorized"
		})
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await userModel.findById(decoded._id);

		req.user = user;

		return next();

	} catch (error) {
		return res.status(401).json({
			message: 'Unauthorized'
		})
	}
}

module.exports.authCaptain = async (req, res, next) => {
	const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Unauthorized", token });
	}

	const isBlacklisted = await blacklistModel.findOne({ token: token });

	if (isBlacklisted) {
		return res.status(401).json({ message: "Unauthorized", isBlacklisted });
	}

	try {
		const decodedId = jwt.verify(token, process.env.JWT_SECRET)._id;
		const captain = await captainModel.findById(decodedId);

		req.captain = captain;
	} catch (err) {
		res.status(401).json({ message: "Unauthorized" });
	}
}