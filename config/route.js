const express = require ('express');
const taskController = require('../controller/taskController');
const userController = require('../controller/userController')
const auth = require('../midlewere/auth');

const route = express.Router();

route.get('/', auth.checkHomePageToken, taskController.homePage);

route.post('/new-account', userController.signUp);

route.post('/login', userController.LogIn);
route.post('/logout', userController.logOut);

route.get('/feed', auth.checkFeedToken, taskController.feed);

route.get('/add-new-task', taskController.createTask);
route.post('/add-task', taskController.addNewTask);


module.exports = route;

