const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type:String,required:true,minLength:1,maxLength:100},
    firstname:{type:String,required:true,minLength:1,maxLength:100},
    lastname:{type:String,required:true,minLength:1,maxLength:100},
    password:{type:String,required:true,minLength:1},
    membership_status:{type:String,required:true,enum:["User","Member","Admin"],default:"User"}
})


module.exports = mongoose.model("User",UserSchema)