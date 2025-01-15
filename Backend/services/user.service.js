const userModel = require('../models/user.model.js')

const newUser = async ({
	firstName, lastName, email, password
}) => {
	if(!firstName || !lastName || !email || !password){
		throw new Error('All feilds required!')
	}

	const user = userModel.create({
		fullName: {
			firstName, lastName
		}, email, password
	})

	return user;
}

module.exports = newUser;