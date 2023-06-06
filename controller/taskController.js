//const fs = require('fs');
//const { uuid } = require('uuidv4');

const homePage = (req, res) => {

    //console.log(req.header("jwt-token"));
    
    res.render('signin', {
        error: ""
    })
}

const createTask = (req, res) => {
    res.render('createTask');
}

//HERE TO SAVE IT IN DB
const addNewTask = (req, res) => {
    let newTask = {
        id: uuid(),
        title: req.body.title,
        desc: req.body.desc,
        isDone: false,
        comments: []
    }

    let oldData = fs.readFileSync('tasks.json');
    let parsedData = JSON.parse(oldData);

    parsedData.push(newTask)

    fs.writeFile('tasks.json', JSON.stringify(parsedData), function(err){
        if(err){
            console.log(err);
        }

        res.redirect('/');
    })
}

const feed = (req, res) => {
    res.render('homePage')
}

module.exports = {
    homePage,
    createTask,
    addNewTask,
    feed
}