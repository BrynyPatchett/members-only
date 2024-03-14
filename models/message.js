const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const {DateTime} = require("luxon")

const MessageSchema = new Schema({
    author: {type:Schema.Types.ObjectID,ref: "User",required:true},
    message: {type:String, required:true, minLength: 1},
    title: {type:String,required:true, minLength:1},
    date: {type:Date,default: Date.now}
})


MessageSchema.virtual("formattedDate").get(function(){
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("Message",MessageSchema)