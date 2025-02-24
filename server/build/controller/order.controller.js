"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPayment = exports.sendStripePublishableKey = exports.getAllUsers = exports.createOrder = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const user_model_1 = __importDefault(require("../model/user.model"));
const course_model_1 = __importDefault(require("../model/course.model"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMails_1 = __importDefault(require("../utils/sendMails"));
const notificationModel_1 = __importDefault(require("../model/notificationModel"));
const order_service_1 = require("../services/order.service");
const redis_1 = require("../utils/redis");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Create Order
exports.createOrder = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { courseId, payment_info } = req.body;
        if (payment_info) {
            if ("id" in payment_info) {
                const paymentIntentID = payment_info.id;
                const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentID);
                if (paymentIntent.status !== "succeeded") {
                    return next(new errorhandler_1.default("Payment not done", 400));
                }
            }
        }
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
            payment_info
        };
        const mailData = {
            order: {
                id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            }
        };
        const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/order-confirmation.ejs"), { order: mailData });
        try {
            if (user) {
                await (0, sendMails_1.default)({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                });
            }
        }
        catch (error) {
            return next(new errorhandler_1.default(error.message, 400));
        }
        user?.courses.push(course?._id);
        await redis_1.redis.set(req.user?._id, JSON.stringify(user));
        await user?.save();
        await notificationModel_1.default.create({
            user: user?._id,
            title: "New Order",
            message: "You have a new order",
        });
        course.purchased = course.purchased ? course.purchased + 1 : 1;
        await course.save();
        (0, order_service_1.newOrder)(data, res, next);
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// get all user -- only for admin
exports.getAllUsers = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        (0, order_service_1.getAllOrderService)(res);
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// --------------------------------
// Sent stripe publi key
exports.sendStripePublishableKey = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
});
// new paymnet
exports.newPayment = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Coder's Corner"
            },
            automatic_payment_methods: {
                enabled: true
            }
        });
        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
