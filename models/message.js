const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    recipient: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
    },
    content: {
        type: String
    }, 
}, { timestamp: true })

const Message = mongoose.model('Message', messageSchema)
module.exports = Message