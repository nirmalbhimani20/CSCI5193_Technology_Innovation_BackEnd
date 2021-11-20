var express = require('express');
const router = express.Router();
const register  = require('../v1/register');

// app.use('/admin' , require('./user/login'));
router.post('/user/register' , register.register);
router.get('/user/test', register.test)

module.exports = router;
