const userModel = require('../models/user.model.js')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const newUser = require('../services/user.service.js')

const registerController = async (res, req, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({ errors: errors.array() });
	}

	const {fullName, email, password} = req.body;

	const hashedPassword = await userModel.hashPassword(password);

	const user = await newUser({
		firstName: fullName.firstName,
		lastName: fullName.lastName,
		email,
		password: hashedPassword
	});

	const token = user.generateAuthToken();

	res.status(201).json({token, user})
}