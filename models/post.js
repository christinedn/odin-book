const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    author: String,
    title: String,
    content: String,
    likes: { 
        type: Number, 
        default: 0 
    },
    comments: { 
        type: Number, 
        default: 0 
    },
    isPublished: { 
        type: Boolean, 
        default: true 
    },
    authorID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)
module.exports = Post