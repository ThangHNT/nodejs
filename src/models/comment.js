const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        content: {type: String, required: true},
        owner:{type: Schema.Types.ObjectId , ref: 'User'},
        course:{type: Schema.Types.ObjectId, ref : 'Course'},
        like_status: {type: String},
    }
)

module.exports = mongoose.model('Comment',Comment);