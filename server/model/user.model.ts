require('dotenv').config();
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegaxPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Universal Hota hai 
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    },
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => String;
    SignRefreshToken: () => String;

};

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name: "],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email: "],
        validate: {
            validator: function (value: string) {
                return emailRegaxPattern.test(value);
            },
            message: "Please enter a valid email",

        },
        unique: true,
    },
    password: {
        type: String,
        // required: [true, "Please Enter Your Password: "],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    }, avatar: {
        public_id: String,
        url: {
            type: String,
            default: function () {
                return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=random&length=1`;
            },
        },
        
    },
    role: {
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [{ courseId: String }],

}, {
    timestamps: true,
});

// Password Protection
userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        next();

    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Sign Access Token
userSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', {
        expiresIn: "5m",
    });

};

// Sign Refresh Token
userSchema.methods.SignRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', {
        expiresIn: "3d",
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}
const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;

