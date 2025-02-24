"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.isAuthenticated = void 0;
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const catchAsyncError_1 = require("./catchAsyncError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
const user_contoller_1 = require("../controller/user.contoller");
// Authenticated User
exports.isAuthenticated = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const access_Token = req.cookies.access_Token;
    if (!access_Token) {
        return next(new errorhandler_1.default("Please Login  to access This Respurce ", 400));
    }
    ;
    const decoded = jsonwebtoken_1.default.decode(access_Token);
    if (!decoded) {
        return next(new errorhandler_1.default("Invalid Token", 400));
    }
    ;
    // Check access token is expire
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
        try {
            await (0, user_contoller_1.updateAccessToken)(req, res, next);
        }
        catch (error) {
            return next(error);
        }
    }
    else {
        const user = await redis_1.redis.get(decoded.id);
        if (!user) {
            return next(new errorhandler_1.default("User Not Found", 400));
        }
        req.user = JSON.parse(user);
        next();
    }
});
// Validate User Role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role || '')) {
            return next(new errorhandler_1.default(`Role ${req.user?.role || ''}  is not allowed to access this resource`, 403));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
