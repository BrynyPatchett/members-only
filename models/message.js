const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {type:Schema.Types.ObjectID,ref: "User",required:true},
    message: {type:String, required:true, minLength: 1},
    title: {type:String,required:true, minLength:1},
    date: {type:Date,default: Date.now}
})


module.exports = mongoose.model("Message",MessageSchema)