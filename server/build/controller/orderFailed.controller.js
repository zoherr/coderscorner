"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderFailed = exports.getAllOrderFailed = exports.createOrderfailed = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const orderModel_1 = __importDefault(require("../model/orderModel"));
const user_model_1 = __importDefault(require("../model/user.model"));
const course_model_1 = __importDefault(require("../model/course.model"));
const orderFailed_model_1 = __importDefault(require("../model/orderFailed.model"));
const orderFailed_service_1 = require("../services/orderFailed.service");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Create Order
exports.createOrderfailed = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { courseId } = req.body;
        const user = await user_model_1.default.findById(req.user?._id);
        const courseExistInUser = user?.courses.some((course) => course._id.toString() === courseId);
        if (courseExistInUser) {
            return next(new errorhandler_1.default("You have already purchased this course", 400));
        }
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new errorhandler_1.default("Course not found", 400));
        }
        const data = {
            courseId: course._id,
            courseName: course.name,
            coursePrice: course.price,
            userId: user?._id,
            userEmail: user?.email,
            userName: user?.name,
        };
        (0, orderFailed_service_1.newOrderFailed)(data, res, next);
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// get all user -- only for admin
exports.getAllOrderFailed = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const orderFailed = await orderFailed_model_1.default.find(); // Assuming getAllOrderFailedService returns a Promise
        res.status(200).json({
            success: true,
            orderFailed,
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// --------------------------------
// Sent stripe publi key
// new paymnet
exports.deleteOrderFailed = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await orderFailed_model_1.default.findById(id);
        const userId = blog?.userId;
        const courseId = blog?.courseId; // Check if an order entry exists with both userId and courseId
        const orderEntry = await orderModel_1.default.exists({ userId: userId, courseId: courseId });
        if (!blog) {
            return next(new errorhandler_1.default("Entry Not Found", 400));
        }
        if (orderEntry) {
            await blog.deleteOne({ id });
            res.status(200).json({
                success: true,
                message: "Order entry deleted successfully.",
            });
        }
        else {
            // No matching order entry found
            res.status(404).json({
                success: false,
                message: "User Didn't Complete his Order.",
            });
        }
    }
    catch (error) {
        // Handle any errors that occur during the deletion process
        next(new errorhandler_1.default(error.message, 400));
    }
});
