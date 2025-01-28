const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerController, loginController, getUserProfile } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware.js')

router.post('/register', [
	body('email').isEmail().withMessage('Invalid Email'),
	body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerController);

router.post('/login', [
	body('email').isEmail().withMessage('Invalid Email'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginController);

router.get('/profile', authMiddleware.authUser, getUserProfile)

module.exports = router;
