"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailRegaxPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
;
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name: "],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email: "],
        validate: {
            validator: function (value) {
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
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
// Sign Access Token
userSchema.methods.SignAccessToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', {
        expiresIn: "5m",
    });
};
// Sign Refresh Token
userSchema.methods.SignRefreshToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', {
        expiresIn: "3d",
    });
};
// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
