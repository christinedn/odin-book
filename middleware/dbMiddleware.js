const User = require('../models/user')
const Post = require('../models/post')
const Notification = require('../models/notification')
const Like = require('../models/like')
const Comment = require('../models/comment')
const Follower = require('../models/follower')
// const Message = require('../models/message')

const currentUserMiddleware = (req, res, next) => {
    // console.log('User Middleware - currentUser:', req.user);
    res.locals.user = req.user;
    next();
}

const postsMiddleware = (req, res, next) => {
    Post.find().sort({ createdAt: -1 }) // newest post at top of page
    .then((posts) => {
        req.posts = posts
        next()
    })
    .catch((err) => {
        console.log(err)
        next();
    })
}

const usersMiddleware = (req, res, next) => {
    User.find() 
    .then((users) => {
        req.users = users
        next()
    })
    .catch((err) => {
        console.log(err)
        next();
    })
}


const notificationsMiddleware = (req, res, next) => {
    Notification.find() 
    .then((notifications) => {
        req.notifications = notifications
        next()
    })
    .catch((err) => {
        console.log(err)
        next();
    })
}


const likesMiddleware = (req, res, next) => {
    Like.find() 
    .then((likes) => {
        req.likes = likes
        next()
    })
    .catch((err) => {
        console.log(err)
        next();
    })
}

const commentsMiddleware = (req, res, next) => {
    Comment.find() 
    .then((comments) => {
        req.comments = comments
        next()
    })
    .catch((err) => {
        console.log(err)
        next();
    })
}

const followerMiddleware = (req, res, next) => {
    Follower.find() 
    .then((follower) => {
        req.follower = follower
        next()
    })
    .catch((err) => {
        console.log(err)
        next();
    })
}


module.exports = {
    currentUserMiddleware,
    postsMiddleware,
    usersMiddleware,
    notificationsMiddleware,
    likesMiddleware,
    commentsMiddleware,
    followerMiddleware
}