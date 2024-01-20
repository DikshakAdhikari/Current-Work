import express from 'express'
import { getClient } from '../connection/db'

const userRouter= express.Router()

userRouter.post('/', async(req,res)=> {
    try{
        const {username, email, password}= req.body
        console.log(username,email,password);
        
        const client = await getClient()
        const existingUser= await client?.query("SELECT * FROM users WHERE username=$1",[username])
        console.log(existingUser?.rows);
        if(existingUser){
            const saveUser= await client?.query("INSERT INTO users (username,email,password) VALUES ($1, $2, $3)", [username,email,password]);
            console.log(saveUser);
            res.json(existingUser)
            
        }else{
            res.status(400).json("User already exists!")
        }
    }catch(err){
        res.status(403).json({message:err})
    }
});

userRouter.post('/signin', async(req,res)=> {
    try{
        const {email, password}= req.body;
        const client= await getClient()
        const existingUser= await client?.query("SELECT * FROM users WHERE email=$1 AND password=$2",[email,password])
        
        if(existingUser){
            console.log('dfdfdfdfdfd');
            
        }

    }catch(err){
        res.send(403)
    }
})



export default userRouter