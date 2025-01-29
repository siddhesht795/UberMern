const mongoose = require('mongoose');

const connectToDB = () => {
	try {
		mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to DB successfully")
	} catch (err) {
		console.log("An error occured while connecting to DB")
	}
}

module.exports = connectToDB;