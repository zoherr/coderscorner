import { NextFunction, Request, Response } from "express";
import errorhandler from "../utils/errorhandler";
import jwt from "jsonwebtoken";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    //    Wrong mongoDB ID error
    if (err.name === 'CastError') {
        const message = `Resource Not Found ,Invalid : ${err.path}`;
        err = new errorhandler(message, 400);
    }
    //Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplpicate ${Object.keys(err.keyValue)} entered`;
        err = new errorhandler(message, 400);
    }

    // Wrong JWT token
    if (err.name === 'JsonWebTokenError') {
        const message = `JSwebtoken Is Invalid, Try again`;
        err = new errorhandler(message, 400);
    }

    // Jwt Expire Error

    if (err.name === 'TokenExpiredError') {
        const message = `JSwebtoken Is Invalid, Try again`;
        err = new errorhandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}