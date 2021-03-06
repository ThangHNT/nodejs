// const mongoose = require('mongoose');
const mongoose = require('../connectDB.js');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Course = new Schema(
    {
        name: { type: String, default: '', required: true },
        description: { type: String, default: '', required: true },
        img: { type: String, required: true },
        videoId: { type: String, required: true },
        slug: { type: String, slug:'name' , default: 'unknown', unique: true },
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    },
    {
        timestamps: true,
    },
);

Course.plugin(mongooseDelete, { overrideMethods: 'all',deletedAt : true });
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
