import FormDataModel from "../model/form.model"; // Assuming you have defined the FormDataModel in a separate file
import { IFormData } from "../model/form.model";
import { Response, Request, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import errorhandler from "../utils/errorhandler";
import cloudinary from "cloudinary";
import { createBlog, createCourse } from "../services/course.service";
import BlogDataModel from "../model/blog.model";


// Route handler for submitting form data
export const uploadBlog = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const image = data.image;
        if (image) {
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "blog",
            })
            data.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }
        createBlog(data, res, next);
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})

// Get all Courses --Without Purchasing
export const getAllBlog = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {

      const blog = await BlogDataModel.find()


      res.status(200).json({
          success: true,
          blog,
      });


  } catch (error: any) {
      return next(new errorhandler(error.message, 400));

  }
});


export const deleteBlog = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { id } = req.params;
      const blog = await BlogDataModel.findById(id);
      if (!blog) {
          return next(new errorhandler("User Not Found", 400));
      }
      await blog.deleteOne({ id });
      res.status(201).json({
          success: true,
          message: "Blog Deleted Successfully",
      });
  } catch (error: any) {
      return next(new errorhandler(error.message, 400));

  }
});


export const getSingleBlog = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogId = req.params.id;

      
            const blog = await BlogDataModel.findById(req.params.id).select("")
            
            res.status(200).json({
                success: true,
                blog,
            });
     
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});