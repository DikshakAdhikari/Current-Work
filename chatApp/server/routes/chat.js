const express= require('express');
const CHAT = require('../models/chat');
const chatRouter= express.Router()


chatRouter.get('/getChats', async(req,res)=> {
    try{
        onlineUsers
    }catch(err){
        res.json({message:err})
    }
});

chatRouter.post('/' , async(req,res)=> {
    const {from, to, message} = req.body;
    
    try{
        const postChat= await CHAT.create({
            chat: {
                text:message
            },
            users: [from, to],
            sender:from
        });
        await postChat.save()
        res.json({message:'Chat saved successfully!'})
    }catch(err){
        res.json(err)
    }
});

module.exports= chatRouter