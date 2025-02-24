import {app} from "./app";
import {v2 as cloudinary} from "cloudinary";
import connectDB from "./utils/db";
import morgan from "morgan";
require("dotenv").config();

// Cludinary Config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_SECRET_KEY 
});
app.use(morgan("dev"));
// Server
app.listen(process.env.port, () =>{
    console.log("Server");
    connectDB();
})
// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dwydxgkvb', 
//   api_key: '296724174789489', 
//   api_secret: 'XydiCBWZ8Z7fC91n3rvbcjfyGGg' 
// });

// Written By Zoher R.