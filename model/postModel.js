const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    title :{
        type: String, 
        required : false
    },

    desc :{
        type: String, 
        required : false
    },

    owner: {
        type: schema.Types.ObjectId,
        ref: "user"
    }
})

module.exports = mongoose.model('post', postSchema)