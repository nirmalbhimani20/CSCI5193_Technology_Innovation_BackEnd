var express = require('express');
const router = express.Router();
const register  = require('../v1/register');
const login = require('../v1/login');
const instructor = require('../v1/instructor');
const profile = require('../v1/profile');

// app.use('/admin' , require('./user/login'));
router.post('/user/register' , register.register);
router.post('/user/login' , login.login );
router.get('/user/instructorlist', instructor.instructorList);
router.post('/user/checkUserIsPresent', instructor.checkUserIsPresent);
router.post('/user/insertQueries', instructor.insertQuery);
router.post('/user/fetchQueries', instructor.fetchQueries);
router.post('/user/insertBlog', instructor.insertBlog);
router.post('/user/fetchBlog', instructor.fetchBlog);
router.post('/user/updateBlog', instructor.updateBlog);
router.post('/user/deleteBlog', instructor.deleteBlog);
router.get('/user/profile', profile.get);
router.post('/user/profile', profile.update);

module.exports = router;
