const express = require('express');
const route = require ('./config/route');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
app.use(cookieParser())

//Set EJS as a view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Use CSS,JS
app.use('/public', express.static('public'));

//require mongoose
require('./config/mongo');

//Make app use the route
app.use(route);


let PORT = 1200;
app.listen(PORT, () => console.log(`Server on ${PORT}`));