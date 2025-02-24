import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getNotification, updateNotification } from "../controller/notification.controller";
import { deleteBlog, getAllBlog, getSingleBlog, uploadBlog } from "../controller/blog.controller";

const blogRouter = express.Router();

blogRouter.post("/submit-blog",uploadBlog )
blogRouter.get("/get-blogs", getAllBlog)
blogRouter.get("/get-blog/:id", getSingleBlog);

blogRouter.delete("/delete-blog/:id", deleteBlog)

export default blogRouter;