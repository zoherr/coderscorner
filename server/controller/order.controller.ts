import { Response, Request, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import errorhandler from "../utils/errorhandler";
import OrderModel, { IOrder } from "../model/orderModel";
import userModel from "../model/user.model";
import courseModel from "../model/course.model";
import path from "path";
import ejs from "ejs";
import sendEmail from "../utils/sendMails";
import NotificationModel from "../model/notificationModel";
import { getAllOrderService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
import { getAllOrderFailedService } from "../services/orderFailed.service";
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Order

export const createOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;

        if(payment_info){
            if("id" in  payment_info){
                const paymentIntentID = payment_info.id;
                const paymentIntent = await stripe.paymentIntents.retrieve(
                  paymentIntentID
                );

                if(paymentIntent.status !== "succeeded"){

                    return next(new errorhandler("Payment not done", 400));
                }

            }
        }

        const user = await userModel.findById(req.user?._id);

        const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId);

        if (courseExistInUser) {
            return next(new errorhandler("You have already purchased this course", 400));
        }

        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new errorhandler("Course not found", 400));
        }

        const data: any = {
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
        }
        const html = await ejs.renderFile(path.join(__dirname, "../mails/order-confirmation.ejs"), { order: mailData });

        try {
            if (user) {
                await sendEmail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                });
            }


        } catch (error: any) {
            return next(new errorhandler(error.message, 400));
        }
        user?.courses.push(course?._id);

        await redis.set(req.user?._id, JSON.stringify(user))

        await user?.save();

        await NotificationModel.create({
            user: user?._id,
            title: "New Order",
            message: "You have a new order",
        });
        course.purchased = course.purchased ? course.purchased + 1 : 1;
        await course.save();


        newOrder(data, res, next);


    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})

// get all user -- only for admin
export const getAllUsers = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllOrderService(res);
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})


// --------------------------------
// Sent stripe publi key

export const sendStripePublishableKey = catchAsyncError(async (req: Request, res: Response) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})

// new paymnet

export const newPayment = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
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


        })
        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret
        })

    } catch (error: any) {
        return next(new errorhandler(error.message, 400));
    }
})