import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt:Date,
});

const otpVerification= mongoose.model("otpVerification", otpSchema);

export default otpVerification