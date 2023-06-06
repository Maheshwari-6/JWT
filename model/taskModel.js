const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
    userId :{
        
    },

    title :{
        type: String, 
        required : true
    },

    desc :{
        type: String, 
        required : true
    }
})

module.exports = mongoose.model('task', taskSchema)