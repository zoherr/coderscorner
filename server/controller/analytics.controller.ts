import { Request,Response,NextFunction } from "express";
import errorhandler from "../utils/errorhandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { generateLast12MonthData } from "../utils/anaylitics";
import userModel from "../model/user.model";
import courseModel from "../model/course.model";
import OrderModel from "../model/orderModel";

// Get user analytics -- Only for admin

export const  getUsersAnalytics = catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {const users = await generateLast12MonthData(userModel);
        res.status(200).json({
            success: true,
            users
        });
        
    } catch (error:any) {
        return next(new errorhandler(error.message, 400));
    }
})

// Get Course analytics -- Only for admin

export const  getCourseAnalytics = catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {const courses = await generateLast12MonthData(courseModel);

        res.status(200).json({
            success: true,
            courses
        });
        
    } catch (error:any) {
        return next(new errorhandler(error.message, 400));
    }
})

// Get Order analytics -- ONly for admin

export const  getOrderAnalytics = catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try {const orders = await generateLast12MonthData(OrderModel);

        res.status(200).json({
            success: true,
            orders
        });
        
    } catch (error:any) {
        return next(new errorhandler(error.message, 400));
    }
})