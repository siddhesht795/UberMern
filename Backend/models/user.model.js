const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	fullName: {
		firstName: {
			type: String,
			required: true,
			minLength: [3, 'First Name must be atleast 3 characters or longer']
		},
		lastName: {
			type: String,
			required: true,
			minLength: [3, 'Last Name must be atleast 3 characters or longer']
		}
	},
	email: {
		type: String,
		required: true,
		minLength: [5, 'Email must be atleast 5 characters or longer']
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	socketId: {
		type: String
	}
}, { timestamps: true })

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
	return token
}

userSchema.statics.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10)
}

module.exports = mongoose.model("User", userSchema)