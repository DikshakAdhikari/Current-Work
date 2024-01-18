const express= require('express')
const pool= require('./connection/db')
const cors= require('cors')

const dotenv= require('dotenv')
dotenv.config()

const app = express();
app.use(express.json())
console.log(pool);
app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on port ${process.env.PORT}`);
} )

