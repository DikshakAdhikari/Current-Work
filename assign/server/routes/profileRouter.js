import express from 'express'
import { createProfile, getUserProfileDetails, uploadedImagePath } from '../controllers/profileController.js';
const profileRouter = express.Router()

profileRouter.post('/picture' , uploadedImagePath)

profileRouter.post('/', createProfile)

profileRouter.get('/:userId', getUserProfileDetails)


export default profileRouter
