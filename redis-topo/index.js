import express from 'express'
import { createClient } from 'redis'

const port= 5000
const app= express()
app.use(express.json())

const client= createClient()
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

const getPublicRepoCount= async()=> {

}


app.get('/user/:username', cache, async(req,res)=> {
    try{
        const user= req.params.username;

        const publicRepos = getPublicRepoCount()


    }catch(err){
        console.log(err);
    }

})

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`);
})
