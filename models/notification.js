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
        type: String, // type of notification, e.g. 'follow request', 'follow request accepted', 'like', 'comment'
    },
    contentID: {
        type: mongoose.Schema.Types.ObjectId, // used to redirect to corresponding notification
        required: false,
    }
    
}, { timestamp: true })

// OverwriteModelError: Cannot overwrite `Notification` model once compiled. --> check if model exists, then create it
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
module.exports = Notification