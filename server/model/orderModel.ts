import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
    courseId: string;
    userId: string;
    courseName: string;
    userEmail: string;
    userName: string;
    coursePrice: number;
    payment_info: object;
}

const orderSchema = new Schema<IOrder>({
    courseId: { type: String, required: true },
    userId: { type: String, required: true },
    payment_info: {
        type: Object,
        // required: true
    },
    courseName: { type: String, required: true },
    coursePrice: { type: Number, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },

},{timestamps:true});

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);
export default OrderModel;