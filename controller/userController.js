const User = require('../models/user')

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
const notifications_get  = (req, res) => {
    
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
}