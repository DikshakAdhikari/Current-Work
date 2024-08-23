"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router.post('/register', auth_controller_1.default.RegisterUser);
router.post('/login', auth_controller_1.default.LoginUser);
router.post('/enable2fa', auth_controller_1.default.Enable2FA);
router.post('/done2fa', auth_controller_1.default.Done2fa);
router.post('/verify2fa', auth_controller_1.default.Verify2fa);
router.post('/', auth_controller_1.default.getUserInfo);
exports.default = router;
