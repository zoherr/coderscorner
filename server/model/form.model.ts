import mongoose, { Document, Schema, Model } from "mongoose";

// Define interface for FormData document
export interface IFormData extends Document {
  fullName: string;
  email: string;
  subject: string;
  phoneNumber: string;
  message: string;
}

// Define FormData schema
const FormDataSchema: Schema = new Schema({
  fullName: { type: String },
  email: { type: String, required: true },
  subject: { type: String },
  phoneNumber: { type: String },
  message: { type: String },
},{
  timestamps: true,
});

// Define FormData model
const FormDataModel: Model<IFormData> = mongoose.model<IFormData>("FormData", FormDataSchema);

export default FormDataModel;
