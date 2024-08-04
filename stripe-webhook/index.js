const express= require("express")
const dotenv= require('dotenv')
dotenv.config()
const stripe= require('stripe')(process.env.STRIPE_PASSWORD)

const app=express()

app.use(express.json());

app.get('/',(req,res)=> {
    res.send("Hello maannnnnaa")
})


app.listen(5000, ()=> {
    console.log(`Server is listening on port ${5000}`);
})