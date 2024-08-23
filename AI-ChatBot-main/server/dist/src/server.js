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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const mongo_1 = require("./configs/mongo");
const emailVerification_1 = __importDefault(require("../src/routes/emailVerification"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: "*", methods: ["GET", "POST", "DELETE", "PUT"] }));
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.use("/otp", emailVerification_1.default);
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "2FA app is running, Health status is OK"
    });
});
app.get("/", (req, res) => {
    res.send({ message: "Hello People :)" });
});
app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Route ${req.originalUrl} is not found`
    });
});
app.listen(process.env.PORT || 3002, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Server is Successfully Running, and App is listening on port " + process.env.PORT || 3002);
    // connect Mongodb
    yield (0, mongo_1.connectMongoose)();
}));
