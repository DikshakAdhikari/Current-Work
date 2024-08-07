import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post('/register', authController.RegisterUser);
router.post('/login', authController.LoginUser);
router.post('/enable2fa', authController.Enable2FA);
router.post('/done2fa', authController.Done2fa)
router.post('/verify2fa', authController.Verify2fa);
router.post('/', authController.getUserInfo)

export default router;