const jwt = require('jsonwebtoken')

const checkHomePageToken = (req, res, next) => {
    
    let token = req.header("cookie");

    if(!token){
        next();
    }else{
        res.redirect('/feed');
    }

}

const checkFeedToken = (req, res, next) => {
    let token = req.header("cookie");

    if(token){
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = {
    checkHomePageToken,
    checkFeedToken
}