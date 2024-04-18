"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var connect_1 = require("./connection/connect");
var userRoute_1 = __importDefault(require("./routes/userRoute"));
var cors_1 = __importDefault(require("cors"));
var emailVerification_1 = __importDefault(require("./routes/emailVerification"));
(0, connect_1.mongooseConnect)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use("/otp", emailVerification_1.default);
app.use("/user", userRoute_1.default);
app.get('/', function (req, res) {
    res.json("Hello there!");
});
app.listen(process.env.PORT, function () {
    console.log("Server is running on port ".concat(process.env.PORT));
});
