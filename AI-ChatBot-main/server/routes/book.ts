import express from 'express';
import { postBook } from '../controllers/book';

const router=express.Router();

router.post('/',postBook);
export default router;