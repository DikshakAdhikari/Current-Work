import express from 'express'
import { signup } from '../controllers/user'
import { login } from '../controllers/user'
const router= express.Router()



router.post('/',signup)

router.post('/signin', login) 


export default router
