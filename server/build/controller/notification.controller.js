"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotification = exports.getNotification = void 0;
const notificationModel_1 = __importDefault(require("../model/notificationModel"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const node_cron_1 = __importDefault(require("node-cron"));
exports.getNotification = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const notification = await notificationModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            notification
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Update notification status -- only admin
exports.updateNotification = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const notification = await notificationModel_1.default.findById(req.params.id);
        if (!notification) {
            return next(new errorhandler_1.default("Notification not found", 400));
        }
        else {
            notification.status ? (notification.status = "read") : notification?.status;
        }
        await notification.save();
        const notifications = await notificationModel_1.default.find().sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            notifications
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Delete notification -- only admin
node_cron_1.default.schedule("0 0 0 * * *", async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notificationModel_1.default.deleteMany({ status: "read", createdAt: { $lt: thirtyDaysAgo } });
    console.log("Deleted notifications older than 30 days");
});
