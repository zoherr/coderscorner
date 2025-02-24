import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getCourseAnalytics, getOrderAnalytics, getUsersAnalytics } from "../controller/analytics.controller";

const analyticsRouter = express.Router();
analyticsRouter.get("/get-user-analytics",isAuthenticated,authorizeRoles("admin"),getUsersAnalytics );
analyticsRouter.get("/get-courses-analytics",isAuthenticated,authorizeRoles("admin"),getCourseAnalytics );
analyticsRouter.get("/get-orders-analytics",isAuthenticated,authorizeRoles("admin"),getOrderAnalytics );

export default analyticsRouter;
