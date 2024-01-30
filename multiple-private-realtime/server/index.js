const express= require('express');
const connect = require('./connection/connect');
const port= 4000

const app= express();

connect()
app.use(express.json())



app.listen(port , ()=> {
    console.log(`Server listening on port ${port}`);
})


 