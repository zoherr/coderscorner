import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getNotification, updateNotification } from "../controller/notification.controller";

const notificationRoute = express.Router();

notificationRoute.get("/get-all-notification", isAuthenticated,authorizeRoles("admin"),getNotification)
notificationRoute.put("/update-notification/:id", isAuthenticated,authorizeRoles("admin"),updateNotification)

export default notificationRoute;