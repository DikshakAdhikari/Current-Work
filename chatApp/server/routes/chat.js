const express= require('express');
const CHAT = require('../models/chat');
const chatRouter= express.Router()

chatRouter.post('/chat' , async(req,res)=> {
    try{
        const postChat= await CHAT.create()
    }catch(err){
        res.json(err)
    }
});

module.exports= chatRouter