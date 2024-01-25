var express = require('express');
var router = express.Router()
const { authUser } = require('../middleware/basicAuth')
const Follower = require('../models/follower')
const User = require('../models/user')


const getDiscoverPageData = async (userId) => {
  try {
    // find all the users that currUser is following
    const allFollowees = await Follower.find({follower: userId})
    // create a new array to store the ids
    const followeeIds = await allFollowees.map(elem => elem.followee)
    // go through all users, if user matches followeeIds, do not add to result
    const userResult = await User.find({ _id: { $nin: followeeIds, $ne: userId }})
    return userResult
  } catch (error) {
    console.log(error)
  }
}

router.get('/discover', authUser, async function(req, res, next) {
  const data = await getDiscoverPageData(req.user._id)
  res.render('discover',  {title: 'Discover', users: data, follower: req.user._id } );
});

module.exports = router;
