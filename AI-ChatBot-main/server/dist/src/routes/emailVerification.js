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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const otpVerification_1 = __importDefault(require("../models/otpVerification"));
const user_1 = __importDefault(require("../models/user"));
const OtpRouter = express_1.default.Router();
OtpRouter.post('/verifyOtp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userId, otp } = req.body;
        console.log(userId, otp);
        if (!userId || !otp) {
            throw Error("Empty otp details are not allowed");
        }
        else {
            const UserOtpVerificationList = yield otpVerification_1.default.find({ userId });
            if (UserOtpVerificationList.length <= 0) {
                throw Error("Account is does not exists or verified already. Please login or signup");
            }
            else {
                const { expiresAt } = UserOtpVerificationList[0];
                const hashedOtp = UserOtpVerificationList[0].otp;
                //@ts-ignore
                if (expiresAt < Date.now()) {
                    // user otp record has expired
                    yield otpVerification_1.default.deleteMany({ userId });
                    throw new Error("Code has expired please request again!");
                }
                else {
                    //@ts-ignore
                    const validOtp = yield bcrypt_1.default.compare(otp, hashedOtp);
                    if (!validOtp) {
                        throw new Error("Invalid code passed. Please check your inbox again!");
                    }
                    else {
                        yield user_1.default.updateOne({ _id: userId }, { emailVerified: true });
                        yield otpVerification_1.default.deleteMany({ userId });
                        res.json({
                            status: "VERIFIED",
                            message: "User email verified successfully!"
                        });
                    }
                }
            }
        }
    }
    catch (err) {
        res.json({
            status: "FAILED",
            message: err
        });
    }
}));
exports.default = OtpRouter;
