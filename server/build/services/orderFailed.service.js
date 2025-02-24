"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrderFailedService = exports.newOrderFailed = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const orderFailed_model_1 = __importDefault(require("../model/orderFailed.model"));
// Create new order
exports.newOrderFailed = (0, catchAsyncError_1.catchAsyncError)(async (data, res) => {
    const orderFailed = await orderFailed_model_1.default.create(data);
    res.status(400).json({
        success: true,
        orderFailed,
    });
});
const getAllOrderFailedService = async (res) => {
    const orderFailed = await orderFailed_model_1.default.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        orderFailed,
    });
};
exports.getAllOrderFailedService = getAllOrderFailedService;
