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
import { IUser } from "../model/user.model";
import { redis } from "../utils/redis";
import OrderFailedModel, { IOrderFailed } from "../model/orderFailed.model";
import { newOrderFailed } from "../services/orderFailed.service";
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Order

export const createOrderfailed = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.body as IOrderFailed;

      

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
            
        };

   

        newOrderFailed(data,res,next)


    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})

// get all user -- only for admin

export const getAllOrderFailed = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderFailed = await OrderFailedModel.find() // Assuming getAllOrderFailedService returns a Promise
        res.status(200).json({
            success: true,
            orderFailed,
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));
    }
});

// --------------------------------
// Sent stripe publi key



// new paymnet


export const deleteOrderFailed = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
          const { id } = req.params;
          const blog = await OrderFailedModel.findById(id);
          const userId = blog?.userId 
          const courseId = blog?.courseId        // Check if an order entry exists with both userId and courseId
          const orderEntry = await OrderModel.exists({userId:userId,courseId:courseId});
          if (!blog) {
            return next(new errorhandler("Entry Not Found", 400));
           }

          if (orderEntry) {
              await blog.deleteOne({id});
              res.status(200).json({
                  success: true,
                  message: "Order entry deleted successfully.",
              });
          } else {
              // No matching order entry found
              res.status(404).json({
                  success: false,
                  message: "User Didn't Complete his Order.",
              });
          }
      } catch (error: any) {
          // Handle any errors that occur during the deletion process
          next(new errorhandler(error.message, 400));
      }
  });
  
