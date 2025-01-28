const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDB = require('./database/db.js')
const userRoutes = require('./routes/user.routes.js')

connectToDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send("Hello world");
})

app.use('/users', userRoutes)

module.exports = app;