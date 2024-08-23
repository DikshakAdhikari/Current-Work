"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const crypto = __importStar(require("crypto"));
const hi_base32_1 = require("hi-base32");
const otpauth_1 = __importDefault(require("otpauth"));
const qrcode_1 = __importDefault(require("qrcode"));
const otpVerification_1 = require("../../services/otpVerification");
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqData = req.body;
        if (yield user_1.default.isEmailUsed(req.body.email)) {
            return res.status(404).json({
                status: "fail",
                message: `User already exist with ${reqData.email}`
            });
        }
        const newUser = new user_1.default(reqData);
        yield newUser.save();
        //@ts-ignore
        yield (0, otpVerification_1.sendOtpVerificationEmail)(newUser, res);
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
});
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user || !(yield user_1.default.isPasswordMatch(email, password))) {
            return res.status(401).json({
                status: "fail",
                message: `Invalid email or password`
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    enabled2fa: user.enable2fa
                }
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "fail",
            message: `Something wrong while login`
        });
    }
});
const Enable2FA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!(yield user_1.default.findOne({ _id: userId }))) {
        return res.status(404).json({
            status: "fail",
            message: "User does not exist"
        });
    }
    // Generate secret key for the user
    const base32_secret = generateBase32Secret();
    // Store secret key in User object
    yield user_1.default.updateOne({ _id: userId }, { secrets2fa: base32_secret });
    //Generate TOTP auth url
    let totp = new otpauth_1.default.TOTP({
        issuer: "codeninjainsights.com",
        label: "codeninjainsights",
        algorithm: "SHA1",
        digits: 6,
        secret: base32_secret
    });
    const otpauth_url = totp.toString();
    qrcode_1.default.toDataURL(otpauth_url, (err, qrUrl) => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: "Error while generating QR Code"
            });
        }
        res.json({
            status: "success",
            data: {
                qrCodeUrl: qrUrl,
                secret: base32_secret
            }
        });
    });
});
const generateBase32Secret = () => {
    const buffer = crypto.randomBytes(15);
    return (0, hi_base32_1.encode)(buffer).replace(/=/g, "").substring(0, 24);
};
const Verify2fa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, token } = req.body;
    console.log(userId, token);
    const user = yield user_1.default.findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({
            status: "fail",
            message: "User does not exist"
        });
    }
    // verify the token
    const totp = new otpauth_1.default.TOTP({
        issuer: "codeninjainsights.com",
        label: "codeninjainsights",
        algorithm: "SHA1",
        digits: 6,
        secret: user.secrets2fa
    });
    const delta = totp.validate({ token });
    if (delta === null) {
        return res.status(401).json({
            status: "fail",
            message: "Authentication failed"
        });
    }
    // update the  user status
    if (!user.enable2fa) {
        yield user_1.default.updateOne({ _id: userId }, { enable2fa: true });
    }
    res.json({
        status: "success",
        data: {
            otp_valid: true
        }
    });
});
const Done2fa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    yield user_1.default.updateOne({ _id: userId }, { enable2fa: true });
    res.json({
        status: "success"
    });
});
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield user_1.default.findOne({ _id: userId });
    console.log(user);
    res.json(user);
});
exports.default = {
    RegisterUser,
    LoginUser,
    Enable2FA,
    Verify2fa,
    Done2fa,
    getUserInfo
};
