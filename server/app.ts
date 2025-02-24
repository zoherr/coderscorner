require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { error } from "console";
import {ErrorMiddleware} from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRoute from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import { submitFormData } from "./controller/form.contoller";
import FormDataModel from "./model/form.model";
import formDataSubmit from "./routes/form.route";
import blogRouter from "./routes/blog.route";
import mongoose from "mongoose";

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

// ṛoutes
app.use("/api/v1",userRouter,courseRouter,orderRouter,notificationRoute,analyticsRouter,formDataSubmit,blogRouter);




// Testing api
// Define a route for HTTP GET requests to "/test"
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Api is working",
    });
});


// Unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});


app.use(ErrorMiddleware);
