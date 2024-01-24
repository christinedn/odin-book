const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId, // the post that the comment is under
        ref: 'User' 
    },
}, { timestamp: true })

const Like = mongoose.model('Like', likeSchema)
module.exports = Like