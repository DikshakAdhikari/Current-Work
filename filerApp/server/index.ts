import express from 'express'
import {getClient} from './connection/db'
import cors from 'cors'
import userRouter from './routes/user'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())
app.use('/user', userRouter)
getClient()

app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on port ${process.env.PORT}`);
} )

