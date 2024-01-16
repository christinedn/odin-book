const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema to define each follower relationship
const followerSchema = new Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    following: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    isPending: { 
        type: Boolean,
        default: true
    },
}, { timestamp: true })

const Follower = mongoose.model('Message', followerSchema)
module.exports = Follower