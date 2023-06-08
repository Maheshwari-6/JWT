const express = require ('express');
const userController = require('../controller/userController');
const postController = require('../controller/postController');
const auth = require('../midlewere/auth');

const route = express.Router();

route.get('/', auth.checkHomePageToken, userController.homePage);

route.post('/new-account', userController.signUp);

route.post('/login', userController.LogIn);
route.post('/logout', userController.logOut);

route.get('/feed', auth.checkFeedToken, postController.feed);
route.get('/add-new-post', auth.checkFeedToken, postController.pageAddPost)
route.post('/create-new-post/:id', postController.funAddPost)

module.exports = route;

