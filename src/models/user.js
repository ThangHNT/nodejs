const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const User = new Schema (
    {
        email : {type: String, required: true, maxLength:30}
    }
)

module.exports = mongoose.model('User',User);