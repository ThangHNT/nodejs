// const mongoose = require('mongoose');
const mongoose = require('../connectDB.js');
const Schema = mongoose.Schema;

const Img = new Schema (
    {
        name: String,
        id_md5: String,
        src: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
    }
)

module.exports = mongoose.model('Img',Img);