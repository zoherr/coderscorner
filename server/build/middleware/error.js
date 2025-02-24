"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    //    Wrong mongoDB ID error
    if (err.name === 'CastError') {
        const message = `Resource Not Found ,Invalid : ${err.path}`;
        err = new errorhandler_1.default(message, 400);
    }
    //Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplpicate ${Object.keys(err.keyValue)} entered`;
        err = new errorhandler_1.default(message, 400);
    }
    // Wrong JWT token
    if (err.name === 'JsonWebTokenError') {
        const message = `JSwebtoken Is Invalid, Try again`;
        err = new errorhandler_1.default(message, 400);
    }
    // Jwt Expire Error
    if (err.name === 'TokenExpiredError') {
        const message = `JSwebtoken Is Invalid, Try again`;
        err = new errorhandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
