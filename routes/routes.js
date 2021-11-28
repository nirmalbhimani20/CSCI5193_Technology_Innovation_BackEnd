var express = require('express');
const router = express.Router();
const register  = require('../v1/register');
const login = require('../v1/login');

// app.use('/admin' , require('./user/login'));
router.post('/user/register' , register.register);
router.post('/user/login' , login.login );

module.exports = router;
