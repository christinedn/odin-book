var express = require('express');
var router = express.Router();
const postController = require('../controller/postController')

router.get("/create", postController.post_create_get)
router.post("/create", postController.post_create_post)
router.delete("/:id", postController.post_delete)
router.delete("/:id/unlike", postController.post_unlike)
router.post("/:id/like", postController.post_like)
router.post("/:id/comment", postController.post_comment)
router.get("/:id/comments", postController.comments_get)

module.exports = router;
