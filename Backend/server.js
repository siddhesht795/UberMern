const express = require('express');
const app = require('./app');

app.listen(process.env.PORT, ()=> {
	console.log(`Server listening to port ${process.env.PORT}`)
})