import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrderFailed extends Document {
    courseId: string;
    userId: string;
    courseName: string;
    userEmail: string;
    userName: string;
    coursePrice: number;
}

const orderFailedSchema = new Schema<IOrderFailed>({
    courseId: { type: String, required: true },
    userId: { type: String, required: true },
    courseName: { type: String, required: true },
    coursePrice: { type: Number, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },

},{timestamps:true});

const OrderFailedModel: Model<IOrderFailed> = mongoose.model("OrderFailed", orderFailedSchema);
export default OrderFailedModel;