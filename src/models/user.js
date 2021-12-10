const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const User = new Schema (
    {
        email : {type: String, required: true, maxLength:30},
        courses : [{type: Schema.Types.ObjectId, ref : 'Course'}]
    }
)

module.exports = mongoose.model('User',User);