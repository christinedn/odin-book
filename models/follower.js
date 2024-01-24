const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema to define each follower relationship
const followerSchema = new Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    followee: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    status: { // accepted, declined, pending
        type: String,
        default: 'pending',
    },
}, { timestamp: true })

const Follower = mongoose.model('Follower', followerSchema)
module.exports = Follower