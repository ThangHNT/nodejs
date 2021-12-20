// const mongoose = require('mongoose');
const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const Img = new Schema (
    {
        name: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
    }
)

module.exports = mongoose.model('Img',Img);