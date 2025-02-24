import { Response,Request,NextFunction } from "express";
import courseModel from "../model/course.model";
import { catchAsyncError } from "../middleware/catchAsyncError";
import BlogDataModel from "../model/blog.model";

// Create Course
export const createCourse = catchAsyncError(async (data:any,res:Response)=>{
    const course = await courseModel.create(data);
    res.status(201).json({
        success:true,
        course
    })
})

export const getAllCourseService = async(res:Response) =>{
    const courses = await courseModel.find().sort({createdAt: -1});
    res.status(200).json({
        success : true,
        courses,
    });
}

// Blog

// Create Course
export const createBlog = catchAsyncError(async (data:any,res:Response)=>{
    const blog = await BlogDataModel.create(data);
    res.status(201).json({
        success:true,
        blog
    })
})

export const getAllBlogService = async(res:Response) =>{
    const blog = await BlogDataModel.find().sort({createdAt: -1});
    res.status(200).json({
        success : true,
        blog,
    });
}