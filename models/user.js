const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String, 
        default: '/images/default-profile-picture.png',
    },
    memberSince: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User