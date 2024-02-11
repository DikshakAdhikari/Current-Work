const express=  require('express')
const { v4: uuidv4 } = require('uuid');
const jwt= require('jsonwebtoken')
let user= []
const userRouter = express.Router()
const secret= 'secret'
userRouter.post('/',async(req,res)=> {
    try{
        const {username, email, password}= req.body;
        const obj= {
            _id:uuidv4(),
            username:username,
            email:email,
            password:password
        }
        user.push(obj)
        res.json("User signed up successfully!")

    }catch(err){
        res.status(403).json(err)
    }

})

userRouter.post('/signin',(req,res)=> {
    try{
        const { email, password}= req.body;
        let token= null;
        user.map((val)=> {
            console.log(val.email, email);
            if(val.email === email){
                console.log('ffff');
                token= jwt.sign({id:val._id, username:val.username, email:val.email}, secret )
            }
        })
        if(!token){
            res.status(402).json("User not registered")
        }else{
            res.json(token)
        }

    }catch(err){
        res.status(403).json(err)
    }

})




module.exports= userRouter
