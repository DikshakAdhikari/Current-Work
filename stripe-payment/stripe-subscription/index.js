const express= require('express')
const dotenv= require('dotenv')
dotenv.config()
const stripe= require('stripe')
const app= express()




app.listen(5000,()=> {
    console.log(`Listening on port ${5000}`);
})
