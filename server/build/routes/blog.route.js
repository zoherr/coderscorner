"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controller/blog.controller");
const blogRouter = express_1.default.Router();
blogRouter.post("/submit-blog", blog_controller_1.uploadBlog);
blogRouter.get("/get-blogs", blog_controller_1.getAllBlog);
blogRouter.get("/get-blog/:id", blog_controller_1.getSingleBlog);
blogRouter.delete("/delete-blog/:id", blog_controller_1.deleteBlog);
exports.default = blogRouter;
