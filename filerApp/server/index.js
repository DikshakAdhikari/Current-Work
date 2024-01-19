const express= require('express')
const getClient= require('./connection/db')
const cors= require('cors')

const dotenv= require('dotenv')
dotenv.config()

const app = express();
app.use(express.json())

getClient()

app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on port ${process.env.PORT}`);
} )

