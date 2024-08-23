import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route";
import { connectMongoose } from "./configs/mongo";
import OtpRouter from "../src/routes/emailVerification";
import dotenv from 'dotenv'
dotenv.config()

const app = express();


app.use(morgan("dev"))
app.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE", "PUT"] }));
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/otp", OtpRouter )


app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "2FA app is running, Health status is OK"
    })
});

app.get("/", (req: Request, res: Response) => {
    res.send({message:"Hello People :)"})
});


app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        status: "fail",
        message: `Route ${req.originalUrl} is not found`
    })
});

app.listen(process.env.PORT || 3002, async () => {
    console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT || 3002)
    
    // connect Mongodb
    await connectMongoose()
});



