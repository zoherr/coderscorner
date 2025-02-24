import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user.model";

interface IComment extends Document {
    question: string;
    user: IUser;
    questionReplies: IComment[];
}

interface IReview extends Document {
    rating: number;
    comment: string;
    user: IUser;
    commentReplies?: IComment[];
};

interface ILink extends Document {
    title: string;
    url: string;
}

interface ICourseData extends Document {
    title: string;
    description: string;
    instructor :string;
    videoUrl: string;
    videoThumbnail: object;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    links: ILink[];
    suggestion: string;
    questions: IComment[];
}

interface Icourse extends Document {
    name: string;
    description: string;
    instructor :string;
    price: number;
    estimatedPrice?: number;
    thumbnail: object;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: { title: string, }[];
    prerequisites: { title: string, }[];
    reviews: IReview[];
    courseData: ICourseData[];
    ratings?: number;
    purchased: number;
}

const reviewSchema = new Schema<IReview>({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String,
    commentReplies: [Object],
});

const linkSchema = new Schema<ILink>({
    title: String,
    url: String,

})

const commentSchema = new Schema<IComment>({
    user: Object,
    question: String,
    questionReplies: [Object],
});

const courseDataSchema = new Schema<ICourseData>({
    title: String,
    description: String,
    videoUrl: String,
    instructor :String,
    // videoThumbnail: Object,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema],

})

const courseSchema = new Schema<Icourse>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    estimatedPrice: {
        type: Number,
    },
    thumbnail: {
        public_id: {
            // required: true,
            type: String
        },
        url: {
            // required: true,
            type: String
        },
    },
    tags: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    },
},{timestamps:true});
const courseModel: Model<Icourse> = mongoose.model("course", courseSchema);
export default courseModel;


