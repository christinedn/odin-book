var express = require('express');
var router = express.Router();
const authController = require('../controller/authController')

router.get('/sign-up', authController.sign_up_get)
router.post('/sign-up', authController.sign_up_post)
router.get('/log-in', authController.log_in_get)
router.post('/log-in', authController.log_in_post)
router.get('/log-out', authController.log_out_get)

module.exports = router;
