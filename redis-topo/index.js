import express from 'express'
import { createClient } from 'redis'
import fetch from 'node-fetch';

const port= 5000
const app= express()
app.use(express.json())


const client= createClient()
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

function printOutput(username, numberOfPublicRepos){
    return `User ${username} has ${numberOfPublicRepos} public repos`
}

async function cache(req,res,next) {
    const username= req.params["username"];
    console.log(username);

    const redisReponse= await client.get(username)
    console.log('redis response',redisReponse);
    if(redisReponse != null){
        res.send(printOutput(username, redisReponse))
    }else{

        next()
    }
}

app.get(`/user/:username`, cache, async (req,res)=> {
    try{
        const username= req.params.username;
        console.log(username);
        const response= await fetch(`https://api.github.com/users/${username}`);
     
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
  
        const data= await response.json()
        client.set(username, data.public_repos)

        res.json(`User ${username} has ${data.public_repos} public repos`)

    }catch(err){
        console.log(err);
    }
})

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`);
})
