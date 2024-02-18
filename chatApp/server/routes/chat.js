const express= require('express');
const CHAT = require('../models/chat');
const chatRouter= express.Router()


chatRouter.post('/getChats', async(req,res)=> {
    try{
        const {from, to}= req.body;
        const chats= CHAT.find({
            $all:{
            users:[from, to]
            }
        }).sort({ updatedAt: 1 });
        console.log(chats);
        res.json(chats)
    }catch(err){
        res.json({message:err})
    }
});

chatRouter.post('/' , async(req,res)=> {
    const {from, to, message} = req.body;
    // console.log(global.onlineUsers);
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