"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const cloudinary_1 = require("cloudinary");
const db_1 = __importDefault(require("./utils/db"));
require("dotenv").config();
// Cludinary Config
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});
// Server
app_1.app.listen(process.env.port, () => {
    console.log("Server");
    (0, db_1.default)();
});
// import {v2 as cloudinary} from 'cloudinary';
// cloudinary.config({ 
//   cloud_name: 'dwydxgkvb', 
//   api_key: '296724174789489', 
//   api_secret: 'XydiCBWZ8Z7fC91n3rvbcjfyGGg' 
// });
// Written By Zoher R.
