const postModel = require('../model/postModel')

const feed = (req, res) => {
    postModel.find()
    .populate("owner")
    .then( allPosts => {
        console.log(allPosts);
        res.render('homePage', {
            posts: allPosts
        })
    })
    .catch(err => {
        console.log(err);
    })
}
const pageAddPost = (req, res) => {
    res.render('addNewPost')
}

const funAddPost = (req,res) => {
    let postObj = {
        ...req.body,
        owner: req.params.id
    };

    let newPost = new postModel(postObj)
    newPost.save()
      .then(() =>{
        res.redirect('/feed');
      })
      .catch((err) => {
        console.log(err);
      })
    }
module.exports = {
    feed,
    pageAddPost,
    funAddPost
}