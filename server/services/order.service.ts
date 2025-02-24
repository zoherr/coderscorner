import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../model/orderModel";
import courseModel from "../model/course.model";

// Create new order

export const newOrder = catchAsyncError(async (data: any, res: Response) => {
    const order = await OrderModel.create(data);

    res.status(400).json({
        success: true,
        order,
    }); 

});

export const getAllOrderService = async(res:Response) =>{
    const orders = await OrderModel.find().sort({createdAt: -1});
    res.status(200).json({
        success : true,
        orders,
    });
}