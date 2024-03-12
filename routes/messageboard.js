var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController")
var messageController = require("../controllers/messageController")
var passport = require('passport');

/* GET home page. */
router.get('/', messageController.index);

router.get('/sign-up', userController.signup_get);

router.post('/sign-up', userController.signup_post);

router.get('/sign-in', userController.signin_get);

router.post('/sign-in',userController.signin_post_validation,passport.authenticate('local',{failureRedirect: '/messageboard/sign-in', failureMessage: true}), userController.signin_post);

router.get('/account', userController.account_get);

router.post('/account', userController.account_post);

router.post('/logout', userController.logout_post);

router.get('/message/create', messageController.message_get);

router.post('/message/create', messageController.message_post);


module.exports = router;
