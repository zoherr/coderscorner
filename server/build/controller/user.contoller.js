"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.updateProfilePicture = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivationToken = exports.registrationUser = void 0;
require('dotenv').config();
const user_model_1 = __importDefault(require("../model/user.model"));
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMails_1 = __importDefault(require("../utils/sendMails"));
const jwt_1 = require("../utils/jwt");
const redis_1 = require("../utils/redis");
const user_service_1 = require("../services/user.service");
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.registrationUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = await user_model_1.default.findOne({ email });
        if (isEmailExist) {
            return next(new errorhandler_1.default("Email already exist", 400));
        }
        ;
        const user = {
            name,
            email,
            password,
        };
        const activationToken = (0, exports.createActivationToken)(user);
        const activationCode = activationToken.activationCode; // Get the activation code here
        const data = { user: { name: user.name }, activationCode }; // Pass the user object with 'name'
        const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/activation-mail.ejs"), data);
        // 
        // const data = { name: user.name, activationCode }; // Pass the activation code directly, not under 'user'
        // 
        try {
            await (0, sendMails_1.default)({
                email: user.email,
                subject: "Zoher Sent you a Code!",
                template: "activation-mail.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Please Check your Email to Activate Your account: ${user.email} to activate your account`,
                activationToken: activationToken.token,
            });
        }
        catch (error) {
            return next(new errorhandler_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        user, activationCode,
    }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
exports.activateUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { activation_Code, activation_Token } = req.body;
        const newUser = jsonwebtoken_1.default.verify(activation_Token, process.env.ACTIVATION_SECRET);
        if (newUser.activationCode !== activation_Code) {
            return next(new errorhandler_1.default("Invalid Activation Code", 400));
        }
        const { name, email, password } = newUser.user;
        const existUser = await user_model_1.default.findOne({ email });
        if (existUser) {
            return next(new errorhandler_1.default("User Already Exist", 400));
        }
        const user = await user_model_1.default.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
;
exports.loginUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new errorhandler_1.default("Please Enter Email and Password", 400));
        }
        ;
        const user = await user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            return next(new errorhandler_1.default("Invalid Email or Password", 400));
        }
        ;
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new errorhandler_1.default("Invalid Email or Password", 400));
        }
        ;
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Logout User
exports.logoutUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        res.cookie("access_Token", "", { maxAge: 1 });
        res.cookie("refresh_Token", "", { maxAge: 1 });
        const userId = req.user?._id || '';
        redis_1.redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Update access Token
exports.updateAccessToken = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const refresh_Token = req.cookies.refresh_Token;
        const decoded = jsonwebtoken_1.default.verify(refresh_Token, process.env.REFRESH_TOKEN);
        const message = 'Could not refresh token';
        if (!decoded) {
            return next(new errorhandler_1.default(message, 400));
        }
        const session = await redis_1.redis.get(decoded.id);
        if (!session) {
            return next(new errorhandler_1.default(message, 400));
        }
        const user = JSON.parse(session);
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "3d",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
            expiresIn: "3d",
        });
        req.user = user;
        res.cookie("access_Token", accessToken, jwt_1.accessTokenOptions);
        res.cookie("refresh_Token", refreshToken, jwt_1.refreshTokenOptions);
        return next();
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Get User Info
exports.getUserInfo = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        (0, user_service_1.getUserById)(userId, res);
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Social Auth
exports.socialAuth = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { email, name, avatar } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            const newUser = await user_model_1.default.create({ email, name, avatar });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
;
exports.updateUserInfo = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user?._id;
        const user = await user_model_1.default.findById(userId);
        // if (email && user) {
        //     const isEmailExist = await userModel.findOne({ email });
        //     if (isEmailExist) {
        //         return next(new errorhandler("Email already exist", 400));
        //     }
        //     user.email = email;
        // }
        if (name && user) {
            user.name = name;
        }
        await user?.save();
        await redis_1.redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
exports.updatePassword = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new errorhandler_1.default("Please Enter Old and New Password", 400));
        }
        const user = await user_model_1.default.findById(req.user?._id).select("+password");
        if (user?.password === undefined) {
            return next(new errorhandler_1.default("Invalid User", 400));
        }
        ;
        const isPasswordMatch = await user?.comparePassword(oldPassword);
        if (!isPasswordMatch) {
            return next(new errorhandler_1.default("Old Password is incorrect", 400));
        }
        user.password = newPassword;
        await user.save();
        await redis_1.redis.set(user._id, JSON.stringify(user));
        res.status(201).json({
            success: true,
            message: "Password Updated Successfully",
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
exports.updateProfilePicture = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { avatar } = req.body;
        const userId = req.user?._id;
        const user = await user_model_1.default.findById(userId);
        if (avatar && user) {
            // If user have One avatar
            if (user?.avatar?.public_id) {
                // First Delete the old Image
                await cloudinary_1.default.v2.uploader.destroy(user?.avatar?.public_id);
                const myCloud = await cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            else {
                const myCloud = await cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
        }
        await user?.save();
        await redis_1.redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            message: "Profile Picture Updated Successfully",
            user,
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// get all user -- only for admin
exports.getAllUsers = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        (0, user_service_1.getAllUsersService)(res);
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Update user role -- only for admin
exports.updateUserRole = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { email, role } = req.body;
        const isUserExist = await user_model_1.default.findOne({ email });
        if (isUserExist) {
            const id = isUserExist._id;
            await (0, user_service_1.updateUserRoleService)(id, role, res); // Corrected the order of arguments
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
// Delete User -- only for admin
exports.deleteUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await user_model_1.default.findById(id);
        if (!user) {
            return next(new errorhandler_1.default("User Not Found", 400));
        }
        await user.deleteOne({ id });
        await redis_1.redis.del(id);
        res.status(201).json({
            success: true,
            message: "User Deleted Successfully",
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
