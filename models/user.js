let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    title: String,
    comment_count: Number,
    comments: Array,
    likes: Number,
    user: {
        name: String,
        uid: String
    }

}, { timestamps: true });

let user = mongoose.model('user', Schema);
module.exports = user;