var express = require('express');
var router = express.Router();
const postController = require('../controller/postController')

router.get("/create", postController.post_create_get)
router.post("/create", postController.post_create_post)
router.delete("/:id", postController.post_delete)

module.exports = router;
