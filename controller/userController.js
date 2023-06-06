const userModel = require('../model/userModel');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    //Check if the user is already in the DB 
    let exictedUser = await userModel.findOne({email: req.body.email});

    if(exictedUser) {
        res.render('signin', {
            error: "user exist"
        })
    }else{
        let hashedPass = bcrypt.hashSync(req.body.password, 12)
        
        let userObj = {
            ...req.body,
            password: hashedPass
        }

        let newUser = new userModel(userObj);
        newUser.save()
        .then( () => {
            let userToken = jwt.sign({newUser}, "This is just a text for JWT");
            res.cookie("jwt-token", userToken, {httpOnly: true});
            res.render('signin', {
                error:"User has been added"
            })

            //res.redirect('/');
        })
        .catch( (err) => {
            throw err
        })
    }
}

const LogIn = (req, resp) => {
    
}

module.exports = {
    signUp,
    LogIn
}