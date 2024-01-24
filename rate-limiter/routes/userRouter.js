const express= require("express")

const userRouter= express.Router()


userRouter.get('/url1', async(req,res)=> {
    try{
        let url1Output ="Dikshak is a master"  //newItem= req.body.name
        res.redirect(`/?data=${url1Output}`)
    }catch(err){
        res.status(403).json({message:err})
    }
})

module.exports= userRouter