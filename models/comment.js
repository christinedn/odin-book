const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    post: {
        type: mongoose.Schema.Types.ObjectId, // the post that the comment is under
        ref: 'Post' 
    },
    content: {
        type: String
    }, 
}, { timestamp: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment