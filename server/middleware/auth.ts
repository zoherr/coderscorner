import { Request, Response, NextFunction } from "express";
import errorhandler from "../utils/errorhandler";
import { catchAsyncError } from "./catchAsyncError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controller/user.contoller";


// Authenticated User
export const isAuthenticated = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_Token = req.cookies.access_Token as string;

    if (!access_Token) {
        return next(new errorhandler("Please Login  to access This Respurce ", 400))
    };
    const decoded = jwt.decode(access_Token) as JwtPayload;

    if (!decoded) {
        return next(new errorhandler("Invalid Token", 400))
    };

    // Check access token is expire
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
        try {
            await updateAccessToken(req, res, next)
        } catch (error) {
            return next(error)
        }
    } else {
        const user = await redis.get(decoded.id);

        if (!user) {
            return next(new errorhandler("User Not Found", 400))
        }

        req.user = JSON.parse(user);
        next();
    }
});


// Validate User Role

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || '')) {
            return next(new errorhandler(`Role ${req.user?.role || ''}  is not allowed to access this resource`, 403))
        }
        next();
    }
}
