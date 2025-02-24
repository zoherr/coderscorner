"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middleware/error");
const user_route_1 = __importDefault(require("./routes/user.route"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
const form_route_1 = __importDefault(require("./routes/form.route"));
const blog_route_1 = __importDefault(require("./routes/blog.route"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
// ṛoutes
exports.app.use("/api/v1", user_route_1.default);
exports.app.use("/api/v1", course_route_1.default);
exports.app.use("/api/v1", order_route_1.default, notification_route_1.default, analytics_route_1.default, form_route_1.default, blog_route_1.default);
// Testing api
// Define a route for HTTP GET requests to "/test"
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Api is working",
    });
});
// Unknown route
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
const screenshotLogSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date, default: Date.now },
});
const ScreenshotLog = mongoose_1.default.model('ScreenshotLog', screenshotLogSchema);
// Endpoint to log screenshot detection
exports.app.post('/api/screenshot-detected', async (req, res) => {
    try {
        const newLog = new ScreenshotLog();
        await newLog.save();
        res.status(201).send('Screenshot detection logged');
    }
    catch (error) {
        res.status(500).send('Error logging screenshot detection');
    }
});
exports.app.use(error_1.ErrorMiddleware);
