"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleBlog = exports.deleteBlog = exports.getAllBlog = exports.uploadBlog = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const course_service_1 = require("../services/course.service");
const blog_model_1 = __importDefault(require("../model/blog.model"));
// Route handler for submitting form data
exports.uploadBlog = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const image = data.image;
        if (image) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "blog",
            });
            data.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        (0, course_service_1.createBlog)(data, res, next);
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Get all Courses --Without Purchasing
exports.getAllBlog = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const blog = await blog_model_1.default.find();
        res.status(200).json({
            success: true,
            blog,
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
exports.deleteBlog = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await blog_model_1.default.findById(id);
        if (!blog) {
            return next(new errorhandler_1.default("User Not Found", 400));
        }
        await blog.deleteOne({ id });
        res.status(201).json({
            success: true,
            message: "Blog Deleted Successfully",
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
exports.getSingleBlog = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const blog = await blog_model_1.default.findById(req.params.id).select("");
        res.status(200).json({
            success: true,
            blog,
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
