require('dotenv').config();
import { Response } from "express";
import { IUser } from "../model/user.model";
import { redis } from "./redis";
import { Redis } from "ioredis";
interface ITokenOptions {
    expires: Date,
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
};
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);
// Options for cookie
export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
};

export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
};
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    // Upload session to redis
    redis.set(user._id, JSON.stringify(user) as any);
    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
    }
    res.cookie('access_Token', accessToken, accessTokenOptions);
    res.cookie('refresh_Token', refreshToken, refreshTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,

    });
}
