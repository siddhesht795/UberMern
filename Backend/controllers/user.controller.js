const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model.js')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/blacklistModel.model.js')

module.exports.registerController = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { fullName, email, password } = req.body;

	const isUserExisting = await userModel.findOne({ email });

	if (isUserExisting) {
		return res.status(400).json({ message: 'User already exists' });
	}

	const hashedPassword = await userModel.hashPassword(password);

	const user = await userService.createUser({
		firstName: fullName.firstName,
		lastName: fullName.lastName,
		email,
		password: hashedPassword
	});

	const token = user.generateAuthToken();

	res.status(201).json({ token, user })
}

module.exports.loginController = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	const user = await userModel.findOne({ email }).select('+password');

	if (!user) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	const token = user.generateAuthToken();

	res.cookie('token', token)

	res.status(200).json({ token, user })

}

module.exports.getUserProfile = async (req, res, next) => {
	res.status(200).json(req.user);
	next();
}

module.exports.logoutUser = async (req, res, next) => {
	res.clearCookie('token');
	const token = req.cookies.token || req.headers.authorization.split()[1];

	await blacklistTokenModel.create({ token });

	res.status(200).json({
		message: "Logged out successfully"
	})
}