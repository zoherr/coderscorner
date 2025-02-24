require('dotenv').config();
import e, { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../model/user.model";
import errorhandler from "../utils/errorhandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMails";
import { Jwt } from "jsonwebtoken";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { Redis } from "ioredis";
import { getAllUsersService, getUserById, updateUserRoleService } from "../services/user.service";
import cloudinary from "cloudinary";


// Register User
interface IRegisterationBody {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export const registrationUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return next(new errorhandler("Email already exist", 400));
        };
        const user: IRegisterationBody = {
            name,
            email,
            password,
        };

        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode; // Get the activation code here

        const data = { user: { name: user.name }, activationCode }; // Pass the user object with 'name'

        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

        try {
            await sendEmail({
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
        } catch (error: any) {
            return next(new errorhandler(error.message, 400));
        }


    } catch (error: any) {
        return next(new errorhandler(error.message, 400));
    }
})

interface IActivationToken {
    token: string;
    activationCode: string;
}


export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({
        user, activationCode,
    }, process.env.ACTIVATION_SECRET as Secret, {
        expiresIn: "5m",
    });
    return { token, activationCode };
};


// User Activate
interface IActivationRequest {
    activation_Code: string;
    activation_Token: string;
}

export const activateUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activation_Code, activation_Token } = req.body as IActivationRequest;
        const newUser: { user: IUser; activationCode: string } = jwt.verify(
            activation_Token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: IUser; activationCode: string };

        if (newUser.activationCode !== activation_Code) {
            return next(new errorhandler("Invalid Activation Code", 400));

        }
        const { name, email, password } = newUser.user;

        const existUser = await userModel.findOne({ email });

        if (existUser) {
            return next(new errorhandler("User Already Exist", 400));
        }

        const user = await userModel.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
        })

    } catch (error: any) {
        return next(new errorhandler(error.message, 400));
    }
})

// Login User
interface ILoginBody {
    email: string;
    password: string;
};

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginBody;
        if (!email || !password) {
            return next(new errorhandler("Please Enter Email and Password", 400));
        };

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return next(new errorhandler("Invalid Email or Password", 400));
        };

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return next(new errorhandler("Invalid Email or Password", 400));
        };
        sendToken(user, 200, res);


    } catch (error: any) {
        return next(new errorhandler(error.message, 400));
    }
});

// Logout User
export const logoutUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_Token", "", { maxAge: 1 })
        res.cookie("refresh_Token", "", { maxAge: 1 })

        const userId = req.user?._id || '';
        redis.del(userId);

        res.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        });


    } catch (error: any) {
        return next(new errorhandler(error.message, 400));
    }
});

// Update access Token
export const updateAccessToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_Token = req.cookies.refresh_Token as string;
        const decoded = jwt.verify(refresh_Token, process.env.REFRESH_TOKEN as string) as JwtPayload;

        const message = 'Could not refresh token';
        if (!decoded) {
            return next(new errorhandler(message, 400));
        }

        const session = await redis.get(decoded.id as string);
        if (!session) {
            return next(new errorhandler(message, 400));
        }

        const user = JSON.parse(session);
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, {
            expiresIn: "3d",
        });

        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, {
            expiresIn: "3d",
        });

        req.user = user;

        res.cookie("access_Token", accessToken, accessTokenOptions);
        res.cookie("refresh_Token", refreshToken, refreshTokenOptions);

        return next()

    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})


// Get User Info

export const getUserInfo = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        getUserById(userId, res);
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})

interface ISocailAuthBody {
    email: string;
    name?: string;
    avatar: string;

}

// Social Auth
export const socialAuth = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, avatar } = req.body as ISocailAuthBody;
        const user = await userModel.findOne({ email });
        if (!user) {
            const newUser = await userModel.create({ email, name, avatar });
            sendToken(newUser, 200, res);
        }
        else {
            sendToken(user, 200, res);

        }
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})


// Upadate user info
interface IUpdateUserInfo {
    name?: string;
    email?: string;
};

export const updateUserInfo = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body as IUpdateUserInfo;
        const userId = req.user?._id;
        const user = await userModel.findById(userId);

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
        await redis.set(userId, JSON.stringify(user));

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }

});


// Update user password
interface IupdatePassword {
    oldPassword: string;
    newPassword: string;
}

export const updatePassword = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as IupdatePassword;

        if (!oldPassword || !newPassword) {
            return next(new errorhandler("Please Enter Old and New Password", 400));
        }

        const user = await userModel.findById(req.user?._id).select("+password");

        if (user?.password === undefined) {
            return next(new errorhandler("Invalid User", 400));
        };

        const isPasswordMatch = await user?.comparePassword(oldPassword);

        if (!isPasswordMatch) {
            return next(new errorhandler("Old Password is incorrect", 400));
        }
        user.password = newPassword;

        await user.save();

        await redis.set(user._id, JSON.stringify(user));

        res.status(201).json({
            success: true,
            message: "Password Updated Successfully",
        });


    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})


// Update Profile Picture
interface IUpdateProfilePicture {
    avatar: string;
}
export const updateProfilePicture = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { avatar } = req.body;
        const userId = req.user?._id;
        const user = await userModel.findById(userId);

        if (avatar && user) {
            // If user have One avatar
            if (user?.avatar?.public_id) {
                // First Delete the old Image
                await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,

                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }
            else {
                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,

                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }
        }

        await user?.save();
        await redis.set(userId, JSON.stringify(user));
        res.status(201).json({
            success: true,
            message: "Profile Picture Updated Successfully",
            user,
        });

    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }

});

// get all user -- only for admin
export const getAllUsers = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllUsersService(res);
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})


// Update user role -- only for admin
export const updateUserRole = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, role } = req.body;
        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            const id = isUserExist._id;
            await updateUserRoleService(id, role, res); // Corrected the order of arguments
        } else {
            res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));
    }
});


// Delete User -- only for admin
export const deleteUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return next(new errorhandler("User Not Found", 400));
        }
        await user.deleteOne({ id });
        await redis.del(id);
        res.status(201).json({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});
