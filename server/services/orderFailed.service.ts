import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import courseModel from "../model/course.model";
import OrderFailedModel from "../model/orderFailed.model";

// Create new order

export const newOrderFailed = catchAsyncError(async (data: any,  res: Response) => {
    const orderFailed = await OrderFailedModel.create(data);

    res.status(400).json({
        success: true,
        orderFailed,
    }); 

});

export const getAllOrderFailedService = async(res:Response) =>{
    const orderFailed = await OrderFailedModel.find().sort({createdAt: -1});
    res.status(200).json({
        success : true,
        orderFailed,
    });
}