const User = require('../models/user')
const Post = require('../models/post')
// const Post = require('../models/post')
// const Comment = require('../models/comment')
// const Follower = require('../models/follower')
// const Message = require('../models/message')
// const Notification = require('../models/notification')

const currentUserMiddleware = (req, res, next) => {
    console.log('User Middleware - currentUser:', req.user);
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

module.exports = {
    currentUserMiddleware,
    postsMiddleware,
    usersMiddleware
}