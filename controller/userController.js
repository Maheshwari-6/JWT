const userModel = require('../model/userModel');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const homePage = (req, res) => {    
    res.render('signin', {
        error: "",
        success: ""
    })
}

const signUp = async (req, res) => {
    //Check if the user is already in the DB 
    let existedUser = await userModel.findOne({email: req.body.email});

    if(existedUser) {
        res.render('signin', {
            error: "user exist",
            success: ""
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
            res.locals.success = "User has been added";
            res.redirect('/');
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
        error: "user is not exist. So signup first please!",
        success: ""
    })
    }else{
    let isCorrectPass = bcrypt.compareSync(req.body.password, existedUser.password)

    if(!isCorrectPass){
     res.render('signin', {
            error: "user password is not correct",
            success: ""
        })  
    }else{
        let infoForToken = {
            id: existedUser._id,
            userName: existedUser.userName,
            email: existedUser.email
        }
        let userToken = jwt.sign({infoForToken}, process.env.JWT_TEXT);
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
    homePage,
    signUp,
    LogIn,
    logOut
}