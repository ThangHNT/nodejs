// const mongoose = require('mongoose');
const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const User = new Schema (
    {
        username : {type: String, maxLength:30 , required: true},
        facebookId :{type: String, default: ''},
        googleId: {type: String, default: ''},
        email : {type: String, default: ''},
        authType : {type: String, maxLength:30, required: true},
        gender : {type: String, maxLength:10, default: ''},
        addresses : {type: String, maxLength:100, default:''},
        avatar : {type: Schema.Types.ObjectId, ref : 'Img'},
        dateOfBirth : {type: Date},
    }
)

module.exports = mongoose.model('User',User);