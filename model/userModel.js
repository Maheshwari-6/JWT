const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    userName :{
        type: String, 
        required : false
    },

    email :{
        type: String, 
        required : false
    },

    password :{
        type: String, 
        required : false
    }
})

module.exports = mongoose.model('user', userSchema)