const User = require('../models/user')
const Notification = require('../models/notification')
const Follower = require('../models/follower')


// when you are signed in as a certain user, you should be able to use all the functions below. however if you are viewing another users page, you should be able to see profile, following, followers, and posts. is this part of usersController? 
// TODO: add in a middleware authUser to certain functions?

// profile_get
const profile_get = (req, res) => {
    
}

// following_get - query the collection
const following_get = (req, res) => {
    
}

// followers_get - query the collection
const followers_get = (req, res) => {
    
}


// notifications_get - query the collection
const notifications_get = (req, res) => {
    res.render('user/notifications', ({ title: "My notifications", user: req.user, notifications: req.notifications, users: req.users }))
}

const notifications_delete = (req, res) => {
    console.log('now in notifications_delete controller')
    const id = req.params.id
    console.log(`printing id in notifications_delete: ${id}`)
    Notification.findByIdAndDelete(id)
    .then(() => {
        res.json({ redirect: '/user/notifications'})
    })
    .catch(err => {
        console.log(err)
    })
}

// when user declines follower request notification, set the follower schema's status to declined
const notification_decline = (req, res) => {
    console.log('now in notifications_decline controller')
    console.log(req.body)
    console.log(`followeeID: ${req.body.followeeId} , followerID: ${req.body.followerId}`)
    // // update follower schema status to declined
    Follower.updateOne(
        {follower: req.body.followerId, followee: req.body.followeeId},
        { $set: { status: 'declined'} }
    ).then((result) => {
        console.log(`result of notification_decline change follower schema status: ${result.acknowledged}`)
    }).catch(err => {
        console.log(err)
    })
}

// posts_get - query the collection
const posts_get = (req, res) => {
    
}

// inbox_get 
const inbox_get  = (req, res) => {
    
}

module.exports = {
    profile_get,
    following_get,
    followers_get,
    notifications_get,
    posts_get,
    inbox_get,
    notifications_delete,
    notification_decline
}