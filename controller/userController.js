const User = require('../models/user')
const Notification = require('../models/notification')
const Follower = require('../models/follower')
const Post = require('../models/post')
const Like = require('../models/like')
const path = require('path')

// get num following and follower for current user
const getProfileData = async (userId) => {
    try {
        const numFollowers = await Follower.countDocuments({ followee: userId, status: 'accepted'});
        const numFollowing = await Follower.countDocuments({ follower: userId, status: 'accepted' });
        const numPosts = await Post.countDocuments({ authorID: userId})
        const allPosts = await Post.find({ authorID: userId})
        return { numFollowers, numFollowing, numPosts, allPosts }
    } catch (error) {
        console.log(error)
    }
}

// profile_get
const profile_get = async (req, res) => {
    try {
        const { numFollowers, numFollowing, numPosts, allPosts } = await getProfileData(req.user)
        res.render('user/profile', ({ title: "My profile", user: req.user, numFollowers, numFollowing, numPosts, allPosts, likes: req.likes}))
    }
    catch (err) {
        console.log(err)
    }
}

const upload_profile_picture_get = (req, res) => {
    res.render('user/upload-profile-picture', ({ title: "Upload profile picture"}))
}

const profile_picture_post = (req, res) => {
    console.log(`now in profile_picture_post`)
    if (req.file) {
        const filePath = req.file.path;
        User.findById(req.user._id)
        .then(user => {
            user.profilePicture = filePath
            return user.save()    
        })
        .then(() => {
            res.json({ profilePicturePath: filePath })
        })
        .catch(err => console.log(err))
    } else {
        // No file was uploaded
        console.log('error in profile_picture_post')
    }
}

// returns the users that currUser is following
const get_followings = async (userId) => {
    try {
        const followingIds = await Follower.find({follower: userId, status: 'accepted'})
        const followingIdsArr = followingIds.map(elem => elem.followee)
        const followingUsers = await User.find({_id: {$in: followingIdsArr}})
        return followingUsers
    }
    catch (error) {
        console.log(error)
    }
}

// following_get - query the collection
const following_get = async (req, res) => {
    const followings = await get_followings(req.user._id)
    res.render('user/followings', ({ title: 'Following', followings}))
}

const get_followers = async (userId) => {
    try {
        const followersId = await Follower.find({followee: userId, status: 'accepted'})
        const followersIdArr = followersId.map(elem => elem.follower)
        const followerUsers = await User.find({_id: {$in: followersIdArr}})
        return followerUsers
    } catch (err) {
        console.log(err)
    }
}

// followers_get - query the collection
const followers_get = async (req, res) => {
    const followers = await get_followers(req.user._id)
    res.render('user/followers', ({ title: 'Followers', followers}))
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

// TODO: posts_get - query the collection
const posts_get = (req, res) => {
    
}

// TODO: inbox_get 
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
    notification_decline,
    profile_picture_post,
    upload_profile_picture_get
}