import { Response } from "express";
import userModel from "../model/user.model"
import { redis } from "../utils/redis";
import FormDataModel from "../model/form.model";



// Get user by Id
export const getUserById = async(id : string,res:Response) =>{
const userJson = await redis.get(id);
if(userJson){
    const user = JSON.parse(userJson);
     res.status(200).json({
        success : true,
        user,
    });
}
};

// Get all users
export const getAllUsersService = async(res:Response) =>{
    const users = await userModel.find().sort({createdAt: -1});
    res.status(200).json({
        success : true,
        users,
    });
};



// Update user role
export const updateUserRoleService = async (id: string, role: string, res: Response) => {
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).json({
        success: true,
        user,
    });
};
