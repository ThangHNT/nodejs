// const mongoose = require('mongoose');
const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const User = new Schema (
    {
        username : {type: String, maxLength:30},
        facebookId :{type: String, require:true},
        email : {type: String}
    }
)

module.exports = mongoose.model('User',User);