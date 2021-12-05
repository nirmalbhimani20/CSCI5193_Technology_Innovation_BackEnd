var express = require('express');
const router = express.Router();
const register  = require('../v1/register');
const login = require('../v1/login');
const instructor = require('../v1/instructor');
const profile = require('../v1/profile');

// login and register routes for both instructor and user
router.post('/user/register' , register.register);
router.post('/user/login' , login.login );

// for user differnet routes based on the different operation
router.get('/user/instructorlist', instructor.instructorList);
router.post('/user/checkUserIsPresent', instructor.checkUserIsPresent);
router.post('/user/insertQueries', instructor.insertQuery);

//route to fetch queries to answer
router.post('/user/fetchQueries', instructor.fetchQueries);

//Blog routes for insert update and delete 
router.post('/user/insertBlog', instructor.insertBlog);
router.post('/user/fetchBlog', instructor.fetchBlog);
router.post('/user/updateBlog', instructor.updateBlog);
router.post('/user/deleteBlog', instructor.deleteBlog);

//route to user insert update and delete 
router.post('/instructor/insertUser', instructor.insertUser);
router.post('/instructor/fetchUser', instructor.fetchUser);
router.put('/instructor/updateUser/:id', instructor.updateUser);
router.delete('/instructor/deleteUser/:id', instructor.deleteUser);

//route to profile management
router.get('/user/profile', profile.get);
router.post('/user/profile', profile.update);

module.exports = router;
