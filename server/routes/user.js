const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/login', UserController.user_login_user);

router.post('/signup', UserController.user_signup_user);

module.exports = router;