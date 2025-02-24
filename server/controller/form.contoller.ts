import FormDataModel from "../model/form.model"; // Assuming you have defined the FormDataModel in a separate file
import { IFormData } from "../model/form.model";
import { Response, Request, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import errorhandler from "../utils/errorhandler";
import NotificationModel from "../model/notificationModel";


// Route handler for submitting form data
export const submitFormData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const formDatas: IFormData = new FormDataModel(req.body);
    await formDatas.save();
    res.status(201).json({ message: "Form data submitted successfully" });

    await NotificationModel.create({
      user: "Anomyus",
      title: "New Order",
      message: "You have a new order",
  });
  
  } catch (error: any) {
    return next(new errorhandler(error.message, 400));
  }
};

// Get all Courses --Without Purchasing
export const getAllformData = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const formDatas = await FormDataModel.find()


    res.status(200).json({
      success: true,
      formDatas,
    });


  } catch (error: any) {
    return next(new errorhandler(error.message, 400));

  }
});


export const deleteFormData = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const formDatas = await FormDataModel.findById(id);
    if (!formDatas) {
      return next(new errorhandler("User Not Found", 400));
    }
    await formDatas.deleteOne({ id });
    res.status(201).json({
      success: true,
      message: "formData Deleted Successfully",
    });
  } catch (error: any) {
    return next(new errorhandler(error.message, 400));

  }
});