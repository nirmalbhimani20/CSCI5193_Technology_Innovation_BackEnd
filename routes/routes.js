var express = require('express');
const router = express.Router();
const register  = require('../v1/register');
const login = require('../v1/login');
const instructor = require('../v1/instructor');

const user = require('../v1/user');

const profile = require('../v1/profile');


// login and register routes for both instructor and user
router.post('/user/register' , register.register);
router.post('/user/login' , login.login );

// for user differnet routes based on the different operation
router.post('/user/instructorlist', user.instructorList);
router.post('/user/checkUserIsPresent', user.checkUserIsPresent);
router.post('/user/insertQueries', user.insertQuery);

//fetch queries to answer
router.post('/instructor/fetchQueries', instructor.fetchQueries);

//Blog routes for insert update and delete 
router.post('/instructor/insertBlog', instructor.insertBlog);
router.post('/instructor/fetchBlog', instructor.fetchBlog);
router.put('/instructor/updateBlog/:id', instructor.updateBlog);
router.delete('/instructor/deleteBlog/:id', instructor.deleteBlog);

//user insert update and delete 
router.post('/instructor/insertUser', instructor.insertUser);
router.post('/instructor/fetchUser', instructor.fetchUser);
router.put('/instructor/updateUser/:id', instructor.updateUser);
router.delete('/instructor/deleteUser/:id', instructor.deleteUser);
router.get('/user/profile', profile.get);
router.post('/user/profile', profile.update);



module.exports = router;
