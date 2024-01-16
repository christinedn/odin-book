const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    recipient: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    message: {
        type: String
    }, 
    status: {
        type: String, 
        default: 'unread' // 'unread' or 'read'
    },
    type: {
        type: String, // type of notification, e.g. 'follow', 'like', 'comment'
    },
    contentID: {
        type: mongoose.Schema.Types.ObjectId, // used to redirect to corresponding notification
    }
    
}, { timestamp: true })

const Notification = mongoose.model('Notification', notificationSchema)
module.exports = Notification