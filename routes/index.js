var express = require('express');
var router = express.Router();
const { authUser } = require('../middleware/basicAuth')
const Follower = require('../models/follower')
const Post = require('../models/post')

const getHomepageData = async(userId) => {
  try {
    console.log(userId)
    // get all followees
    const allFollowees = await Follower.find({follower: userId, status: 'accepted'})
    // create an array containing only the followeeIds
    const followeeIds = allFollowees.map(elem => elem.followee);
    // only display posts from the current user, or those users that current user is following
    const postResult = await Post.find({
      $or: [
        { authorID: { $in: followeeIds } },
        { authorID: userId }
      ]
    });
    return postResult

  } catch (err) {
    console.log(err)
  }
}

router.get('/' , authUser, async function(req, res, next) {
  try {
    const postResult = await getHomepageData(req.user._id);
    res.render('index', { title: 'Homepage', user: req.user, posts: postResult, likes: req.likes, comments: req.comments });
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;



