// const mongoose = require('mongoose');
const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const User = new Schema (
    {
        username : {type: String, maxLength:30 },
        facebookId :{type: String},
        googleId: {type: String},
        email : {type: String},
        authType : {type: String, maxLength:30},
        age : {type : Number, default: null},
        gender : {type: String, maxLength:10, default: null},
        addresses : {type: String, maxLength:100},
        dateOfBirth : {type: Date},
        avatar : {type: Image},
    }
)

module.exports = mongoose.model('User',User);