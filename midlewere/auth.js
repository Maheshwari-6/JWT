const jwt = require('jsonwebtoken')

const checkHomePageToken = (req, res, next) => {
    
    let token = req.cookies.userToken;

    if(!token){
        res.locals.user = false;
        next();
    }else{
        res.redirect('/feed');
    }

}

const checkFeedToken = (req, res, next) => {
    let token = req.cookies.userToken;

    if(token){
        jwt.verify(token, process.env.JWT_TEXT, async (err, userInfo) =>{
            if(err) {
                console.log(err)
            }else{
                res.locals.user = userInfo.infoForToken.userName;
                res.locals.email = userInfo.infoForToken.email;
                res.locals.userId = userInfo.infoForToken.id;
                next();
            }
        })
        
    } else {
        res.locals.user = false;
        res.redirect('/');
    }
}

module.exports = {
    checkHomePageToken,
    checkFeedToken
}