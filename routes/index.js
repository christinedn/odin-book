var express = require('express');
var router = express.Router();
const { authUser } = require('../middleware/basicAuth')

/* GET home page. */
router.get('/' , authUser, function(req, res, next) {
  res.render('index',  {title: 'Homepage', user: req.user, posts: req.posts } );
});

module.exports = router;
