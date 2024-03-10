exports.index = function (req, res){

    //load all messages from db, and pass them to the view
    //pass the user object to the view, will be undefined if not logged in 
    // view decides: Not logged in/ logged in not a member, show messages w/o names,
    // logged in has option to create
    // member, sees names
    // admin sees delete option
    res.render("index", {title:"Messages"})
    // res.send("NOT IMPLEMENTED: Message Controller Index Page")
}

exports.message_get = (req, res,) =>{
    
    res.render("message-form", {title:"Create Message"})
}

exports.message_post = (req, res,) =>{
    res.send("NOT IMPLEMENTED: Message Controller POST MESSAGE CREATE")
}