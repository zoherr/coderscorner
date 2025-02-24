import mongoose, { Document, Schema, Model } from "mongoose";

// Define interface for FormData document
export interface IBlogData extends Document {
  title: string;
  image: object;
  subject: string;
  blogData: string;
  author: string;
  category:string;
}

// Define FormData schema
const BlogDataSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: Object },
  subject: { type: String, required: true },
  blogData: { type: String, required: true },
  author: { type: String, required: true },
  category : { type: String, required: true },
},{
  timestamps: true,
});

// Define FormData model
const BlogDataModel: Model<IBlogData> = mongoose.model<IBlogData>("BlogData", BlogDataSchema);

export default BlogDataModel;
