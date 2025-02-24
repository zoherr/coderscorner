"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFormData = exports.getAllformData = exports.submitFormData = void 0;
const form_model_1 = __importDefault(require("../model/form.model")); // Assuming you have defined the FormDataModel in a separate file
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
// Route handler for submitting form data
const submitFormData = async (req, res, next) => {
    try {
        const formDatas = new form_model_1.default(req.body);
        await formDatas.save();
        res.status(201).json({ message: "Form data submitted successfully" });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
};
exports.submitFormData = submitFormData;
// Get all Courses --Without Purchasing
exports.getAllformData = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const formDatas = await form_model_1.default.find();
        res.status(200).json({
            success: true,
            formDatas,
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
exports.deleteFormData = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const formDatas = await form_model_1.default.findById(id);
        if (!formDatas) {
            return next(new errorhandler_1.default("User Not Found", 400));
        }
        await formDatas.deleteOne({ id });
        res.status(201).json({
            success: true,
            message: "formData Deleted Successfully",
        });
    }
    catch (error) {
        return next(new errorhandler_1.default(error.message, 400));
    }
});
