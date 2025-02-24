"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogService = exports.createBlog = exports.getAllCourseService = exports.createCourse = void 0;
const course_model_1 = __importDefault(require("../model/course.model"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const blog_model_1 = __importDefault(require("../model/blog.model"));
// Create Course
exports.createCourse = (0, catchAsyncError_1.catchAsyncError)(async (data, res) => {
    const course = await course_model_1.default.create(data);
    res.status(201).json({
        success: true,
        course
    });
});
const getAllCourseService = async (res) => {
    const courses = await course_model_1.default.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        courses,
    });
};
exports.getAllCourseService = getAllCourseService;
// Blog
// Create Course
exports.createBlog = (0, catchAsyncError_1.catchAsyncError)(async (data, res) => {
    const blog = await blog_model_1.default.create(data);
    res.status(201).json({
        success: true,
        blog
    });
});
const getAllBlogService = async (res) => {
    const blog = await blog_model_1.default.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        blog,
    });
};
exports.getAllBlogService = getAllBlogService;
