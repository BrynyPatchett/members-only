const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler')
const Message = require('../models/message');



exports.index = asyncHandler(async (req, res) => {
    const messages = await Message.find().sort({date:1}).populate("author",'firstname lastname').exec()
    //load all messages from db, and pass them to the view
    //pass the user object to the view, will be undefined if not logged in 
    // view decides: Not logged in/ logged in not a member, show messages w/o names,
    // logged in has option to create
    // member, sees names
    // admin sees delete option
    // console.log(req.user)
    res.render("index", {title:"Messages",user:req.user,messages:messages})
    // res.send("NOT IMPLEMENTED: Message Controller Index Page")
})

exports.message_get = (req, res,) =>{
    res.render("message-form", {title:"Create Message",user:req.user})
}

exports.message_post = [(req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.redirect('/messageboard/sign-in')
    }
},
body("message","Message must not be empty").trim().isLength({min:1, max: 200}).withMessage("Message must be between 1 and 200 characters").escape(),
asyncHandler(async (req, res,) =>{
    console.log(req.body.message.length)
    const errors = validationResult(req);
    const message = new Message({
        author: req.user._id,
        message: req.body.message,
        title:'placeholder'
    })
    console.log(errors)
    if(!errors.isEmpty()){
        res.render("message-form",{title:"Create Message",message:message.message, errors:errors.array(),user:req.user})
        return
    }
    await message.save()
    console.log("Created message")
    res.redirect("/messageboard")
})]