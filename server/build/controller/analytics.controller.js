"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderAnalytics = exports.getCourseAnalytics = exports.getUsersAnalytics = void 0;
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const anaylitics_1 = require("../utils/anaylitics");
const user_model_1 = __importDefault(require("../model/user.model"));
const course_model_1 = __importDefault(require("../model/course.model"));
const orderModel_1 = __importDefault(require("../model/orderModel"));
// Get user analytics -- Only for admin
exports.getUsersAnalytics = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const users = await (0, anaylitics_1.generateLast12MonthData)(user_model_1.default);
        res.status(200).json({
            success: true,
            users
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Get Course analytics -- Only for admin
exports.getCourseAnalytics = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const courses = await (0, anaylitics_1.generateLast12MonthData)(course_model_1.default);
        res.status(200).json({
            success: true,
            courses
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Get Order analytics -- ONly for admin
exports.getOrderAnalytics = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const orders = await (0, anaylitics_1.generateLast12MonthData)(orderModel_1.default);
        res.status(200).json({
            success: true,
            orders
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
