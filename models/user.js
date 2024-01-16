const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: add profile picture
// number of posts, followers, and following are dynamically calculated by querying the collection with the users ID
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    memberSince: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User