const express = require ('express');
const taskController = require('../controller/taskController');
const userController = require('../controller/userController')

const route = express.Router();

route.get('/', taskController.homePage);

route.post('/new-account', userController.signUp)

route.get('/feed', taskController.feed);

route.get('/add-new-task', taskController.createTask);
route.post('/add-task', taskController.addNewTask);


module.exports = route;

