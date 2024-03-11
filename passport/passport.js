var passport = require('passport')
var bcrypt = require('bcryptjs')
var localStrategy = require('passport-local').Strategy
const User = require('../models/user')
//called on passport Authticate 
const strategy = new localStrategy(
    async function(username,password,done){
      try{
      const user = await User.findOne({username:username});
      if(!user){
        return done(null,false)
      }
      const validPassword = await bcrypt.compare(password,user.password);
      if(!validPassword){
        return done(null,false, {message:"incorrect password"})
      }else{
        return done(null,user)
      }}
      catch(err){
        return done(err)
      }
  })

  passport.use(strategy)

  passport.serializeUser((user,done) => {
      done(null,user.id)
  })

  passport.deserializeUser(async (id,done) => {
    try{
      const user =  await User.findById(id);
      done(null,user)
    }catch(err){
      done(err)
    }
  })
  

