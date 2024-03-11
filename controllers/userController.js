const User = require("../models/user")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")


exports.signup_get = async (req, res) => {
    res.render("sign-up-form", { title: "Sign up" })
}




exports.signup_post = [body("username").trim().isLength({ min: 5 }).escape().withMessage("Username must be 5 or more characters").isAlphanumeric().withMessage("username must be Alphanumeric Only"),
body("firstname").trim().isLength({ min: 1 }).escape().withMessage("Firstname must be 1 or more characters").isAlphanumeric().withMessage("firstname must be Alphanumeric Only"),
body("lastname").trim().isLength({ min: 1 }).escape().withMessage("lastname must be 1 or more characters").isAlphanumeric().withMessage("lastname must be Alphanumeric Only"),
body("password").trim().isLength({ min: 3 }).escape().withMessage("password must be 3 or more characters"),
body('confirmpassword').custom((value, { req }) => {
    return value === req.body.password;
}).withMessage("Confirmation Password must match"),
asyncHandler(async (req, res,next) => {
    const errors = validationResult(req);
    let user =  new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    if (!errors.isEmpty()) {
        res.render("sign-up-form", { title: "Sign up", user: user, errors:errors.array()})
        return
    }

    const exists = await User.findOne({username:req.username});
    if(exists != null){
        res.render("sign-up-form", { title: "Sign up", user: user, errors:[{msg:"Account with username already exists"}]})
        return;
    }
    next()
}),
asyncHandler(async (req, res) => {
     bcrypt.hash(req.body.password,10,async(err, hashedPassword) => {
        if(err){
            res.render("sign-up-form", { title: "Sign up", errors:[{msg:err}]})
            return
        }
        const newUser = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPassword,
        })
        
        await newUser.save();
        res.redirect("/messageboard/sign-in")
    })
    })
]
exports.signin_get = (req, res) => {
    res.render("sign-in-form", { title: "Sign in" })
}

exports.signin_post = (req, res) => {
    // console.log(req.user)
    // console.log(req.session)
    res.redirect("/messageboard")
    // res.send("NOT IMPLEMENTD: UserController SIGN IN POST")
}

exports.account_get = (req, res) => {
    res.render("account", { title: "Account" })
}

exports.account_post = (req, res) => {
    res.send("NOT IMPLEMENTD: UserController Account POST")
}