var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')
const { authUser } = require('../middleware/basicAuth')



router.get("/profile", userController.profile_get)
router.get("/following", userController.following_get)
router.get("/followers", userController.followers_get)
router.get("/notifications", authUser, userController.notifications_get)
router.delete("/notification/:id", userController.notifications_delete)
router.put("/notification/:id", userController.notification_decline)
router.get("/posts", userController.posts_get)
router.get("/inbox", userController.inbox_get)

module.exports = router;
