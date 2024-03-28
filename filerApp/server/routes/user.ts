import express from 'express'
import { getClient } from '../connection/db'
import bcrypt, { hash } from 'bcrypt'

const userRouter= express.Router()
const saltRounds=10;

userRouter.post('/', async(req,res)=> {
    try{
        const {username, email, password}= req.body
        console.log(username,email,password);
        
        const client = await getClient()
        const existingUser= await client?.query("SELECT * FROM users WHERE username=$1",[username])
        console.log(existingUser);
        if(!existingUser?.rows ){
            const statement= "INSERT INTO users (username,email,password) VALUES ($1, $2, $3)"
            bcrypt.hash(password, saltRounds ,async (err, hash)=> {
                if(err){
                    throw err
                }
                const values= [username, email,hash]
                const saveUser= await client?.query(statement, values);
                console.log('stored');
                res.json('stored!')
                
            })
            
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
        console.log(email,password);
        
        const client= await getClient()
        const existingUser= await client?.query("SELECT * FROM users WHERE email=$1",[email])
        
        if(existingUser?.rows){
            const hashedPassword= existingUser.rows[0].password
            bcrypt.compare(password, hashedPassword , (err, result)=> {
                if(err){
                    throw err
                }
                if(result){
                    res.json("signed in successfully!")
                }else{
                    throw new Error('Password verification failed!')
                }
                
            })
            
        }else{
            res.status(403).json({message:"Register user first!"})
        }

    }catch(err){
        res.status(403).json({message:err})
    }
})


export default userRouter