var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController")
var messageController = require("../controllers/messageController")

/* GET home page. */
router.get('/', messageController.index);

router.get('/sign-up', userController.signup_get);

router.post('/sign-up', userController.signup_post);

router.get('/sign-in', userController.signup_get);

router.post('/sign-in', userController.signup_post);

router.get('/message/create', messageController.message_get);

router.post('/message/create', messageController.message_post);


module.exports = router;
