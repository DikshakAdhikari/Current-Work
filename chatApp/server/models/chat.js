const mongoose= require('mongoose')

const ChatSchema= new mongoose.Schema({
    chat:{
        text:String,
        required:true
    },
    users:Array,
    sender:{
        type:String
    }
},{timestamps:true});

const CHAT= new mongoose.model('chat', ChatSchema)
module.exports= CHAT