import express from 'express'
import { insertUserController } from '../controllers/userController.js'
const userRouter= express.Router()

userRouter.post('/', insertUserController)


export default userRouter

