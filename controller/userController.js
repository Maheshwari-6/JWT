const userModel = require('../model/userModel');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    //Check if the user is already in the DB 
    let existedUser = await userModel.findOne({email: req.body.email});

    if(existedUser) {
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
            //let userToken = jwt.sign({newUser}, "This is just a text for JWT");
            //res.cookie("jwt-token", userToken, {httpOnly: true});
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

const LogIn = async (req, res) => {
   //Check if the user is already in the DB 
   let existedUser = await userModel.findOne({email: req.body.email});
   
   if(!existedUser) {
    res.render('signin', {
        error: "user is not exist. So signup first please!"
    })
    }else{
    let isCorrectPass = bcrypt.compareSync(req.body.password, existedUser.password)

    if(!isCorrectPass){
     res.render('signin', {
            error: "user password is not correct"
        })  
    }else{
        let userToken = jwt.sign({existedUser}, "This is just a text for JWT");
        res.cookie("userToken", userToken, {httpOnly: true});
        res.redirect('/feed')
    }
    }
   }

const logOut = (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/');
}
module.exports = {
    signUp,
    LogIn,
    logOut
}