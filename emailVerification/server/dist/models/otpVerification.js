"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var otpSchema = new mongoose_1.default.Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});
var otpVerification = mongoose_1.default.model("otpVerification", otpSchema);
exports.default = otpVerification;
