exports.signup_get = (req,res) =>{
    res.render("sign-up-form", {title:"Sign up"})
}

exports.signup_post = (req,res) =>{
    res.send("NOT IMPLEMENTD: UserController SIGN UP POST")
}

exports.signin_get = (req,res) =>{
    res.render("sign-in-form", {title:"Sign in"})
}

exports.signin_post = (req,res) =>{
    res.send("NOT IMPLEMENTD: UserController SIGN IN POST")
}