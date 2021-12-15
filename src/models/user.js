// const mongoose = require('mongoose');
const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const User = new Schema (
    {
        email : {type: String, maxLength:30},
        facebookId :{type: String, require:true}
    }
)

module.exports = mongoose.model('User',User);