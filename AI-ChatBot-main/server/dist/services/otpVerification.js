"use strict";
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
exports.sendOtpVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const bcrypt_1 = __importDefault(require("bcrypt"));
const otpVerification_1 = __importDefault(require("../src/models/otpVerification"));
//@ts-ignore
const sendOtpVerificationEmail = ({ _id, email }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        //mail options
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email addresss and complete the signup</p><p>This otp <b>expires in 1 hour</b>.</p>`
        };
        //hash the otp
        const saltRounds = 10;
        const hashedOtp = yield bcrypt_1.default.hash(otp, saltRounds);
        const newOtpVerification = yield new otpVerification_1.default({
            userId: _id,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiredAt: Date.now() + 3600000,
        });
        yield newOtpVerification.save();
        transporter.sendMail(mailOptions);
        res.json({
            status: "PENDING",
            message: "Verification otp email sent",
            data: {
                userId: _id,
                email,
            }
        });
    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: err
        });
    }
});
exports.sendOtpVerificationEmail = sendOtpVerificationEmail;
