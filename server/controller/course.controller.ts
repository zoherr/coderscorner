import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import errorhandler from "../utils/errorhandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCourseService } from "../services/course.service";
import courseModel from "../model/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import { userInfo } from "os";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMails";
import NotificationModel from "../model/notificationModel";
import axios from "axios";

// upload Course
export const uploadCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses",
            })
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }
        createCourse(data, res, next);
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})

// Edit Course
export const editCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        // if (thumbnail) {
        //     await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        //     const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        //         folder: "courses",
        //     });
        //     data.thumbnail = {
        //         public_id: myCloud.public_id,
        //         url: myCloud.secure_url,
        //     }
        // }

        const courseId = req.params.id;
        const course = await courseModel.findByIdAndUpdate(courseId, {
            $set: data
        },
            {
                new: true,
            })
        res.status(201).json({
            success: true,
            course,
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});

// Get-Single Course--Without Purchasing
export const getSingleCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;

        const isCacheExist = await redis.get(courseId);
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);

            res.status(200).json({
                success: true,
                course,
            })
        }
        else {
            const course = await courseModel.findById(req.params.id).select("-courseData.demoUrl -courseData.suggestion -courseData.questions -courseData.links");

            await redis.set(courseId, JSON.stringify(course));
            res.status(200).json({
                success: true,
                course,
            });
        }
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});

// Get all Courses --Without Purchasing
export const getAllCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const courses = await courseModel.find().select("-courseData.demoUrl -courseData.suggestion -courseData.questions -courseData.links");


        res.status(200).json({
            success: true,
            courses,
        });


    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});

// Get Course content -- Only for valid User
export const getCourseByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;

        const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId);
        if (!courseExists) {
            return next(new errorhandler("You are not eligible for this Course!! ", 400));
        }
        const course = await courseModel.findById(courseId);
        const content = course?.courseData;
        res.status(200).json({
            success: true,
            content,
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});

// Add Questions in course
interface IAddQuestionData {
    question: string;
    courseId: string;
    contentId: string;

};

export const addQuestion = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId }: IAddQuestionData = req.body;

        const course = await courseModel.findById(courseId);
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new errorhandler("Invalid Content Id", 400));
        }
        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new errorhandler("Invalid Content Id", 400));
        }

        // Create a new Question Object 
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        }

        // Add this question to the courseContent
        courseContent.questions.push(newQuestion);
        await NotificationModel.create({
            user: req.user?._id,
            title: "New Question",
            message: `You have a new question in ${courseContent.title}`,
        });
        await course?.save();

        res.status(200).json({
            success: true,
            course,
            message: "Question added successfully!!",
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});

// Add annswer in course question
interface IAddAnswerData {
    answer: string;
    courseId: string;
    contentId: string;
    questionId: string;
}

export const addAnswer = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, courseId, contentId, questionId }: IAddAnswerData = req.body;

        const course = await courseModel.findById(courseId);

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new errorhandler("Invalid Content Id", 400));
        }
        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

        if (!courseContent) {
            return next(new errorhandler("Invalid Content Id", 400));
        }

        const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId));

        if (!question) {
            return next(new errorhandler("Invalid Question Id", 400));
        }

        // Create a new Question Object
        const newAnswer: any = {
            user: req.user,
            answer,
        }

        // Add this question to the courseContent
        question.questionReplies?.push(newAnswer);

        await course?.save();

        if (req.user?._id === question.user._id) {
            // Notification
            await NotificationModel.create({
                user: req.user?._id,
                title: "New Question Reply Recived",
                message: `You have a new answer in ${courseContent.title}`,
            });
        } else {
            const data = {
                name: question.user.name,
                title: courseContent.title,

            }
            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data);

            try {
                await sendEmail({
                    email: question.user.email,
                    subject: "Question Reply",
                    data,
                    template: "question-reply.ejs"
                })
            } catch (error: any) {
                return next(new errorhandler(error.message, 400));

            }

            res.status(200).json({
                success: true,
                course,
                message: "Answer added successfully!!",
            })
        }

    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})

// Add Review in Course
interface IAddReviewData {
    rating: number;
    review: string;
    userId: string;
};

export const addReview = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        // Check  if courseId already exists in userCourseList
        const courseExists = userCourseList?.some((course: any) => course._id.toString() === courseId.toString());

        if (!courseExists) {
            return next(new errorhandler("You are not eligible for this Course!! ", 400));
        }

        const course = await courseModel.findById(courseId);
        const { review, rating } = req.body as IAddReviewData;
        const reviewData: any = {
            user: req.user,
            comment: review,
            rating
        }

        course?.reviews.push(reviewData);

        let avg = 0;
        course?.reviews.forEach((rev: any) => {
            avg += rev.rating;
        })
        if (course) {
            course.ratings = avg / course.reviews.length;

        }
        await course?.save();

        const notification = {
            title: "New Review Received",
            message: `${req.user?.name} has given a review on ${course?.name}`,
        }
        res.status(200).json({
            success: true,
            course,
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});

// Add Reply In review
interface IAddReviewData {
    comment: string;
    courseId: string;
    reviewId: string;
}

export const addReplyToReview = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, courseId, reviewId } = req.body as IAddReviewData;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new errorhandler("Course Not Found", 400));
        }

        const review = course?.reviews?.find((rev: any) => rev._id.toString() === reviewId);

        if (!review) {
            return next(new errorhandler("Review Not Found", 400));
        }

        const replyData: any = {
            user: req.user,
            comment
        };
        if (!review.commentReplies) {
            review.commentReplies = [];
        }

        review.commentReplies?.push(replyData);

        await course?.save();
        res.status(200).json({
            success: true,
            course,
            message: "Reply added successfully!!"
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})


// get all user -- only for admin
export const getAllUsers = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllCourseService(res);
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})

// Delete Course -- only for admin
export const deleteCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const course = await courseModel.findById(id);
        if (!course) {
            return next(new errorhandler("course Not Found", 400));
        }
        await course.deleteOne({ id });
        await redis.del(id);
        res.status(201).json({
            success: true,
            message: "course Deleted Successfully",
        });
    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
});

export const generateVideoUrl = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { videoId } = req.body;
        const response = await axios.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 330 }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Apisecret ${process.env.VIDEOCIPHER_API_SECRET}`,
            }
        })
        res.json(response.data)

    } catch (error: any) {
        return next(new errorhandler(error.message, 400));

    }
})