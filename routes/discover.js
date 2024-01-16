var express = require('express');
var router = express.Router()
const { authUser } = require('../middleware/basicAuth')


// TODO: user should not be able to access this page if not logged in
router.get('/discover', authUser, function(req, res, next) {
  res.render('discover',  {title: 'Discover', users: req.users } );
});

module.exports = router;
