const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: String, 
        ref: 'User' 
    }, 
    postId: {
        type: mongoose.Schema.Types.ObjectId, // the post that the comment is under
        ref: 'Post' 
    },
    content: {
        type: String
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    } 
}, { timestamp: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment