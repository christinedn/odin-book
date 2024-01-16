var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

router.post("/profile", userController.profile_get)
router.post("/following", userController.following_get)
router.post("/followers", userController.followers_get)
router.post("/notifications", userController.notifications_get)
router.post("/posts", userController.posts_get)
router.post("/inbox", userController.inbox_get)

module.exports = router;
