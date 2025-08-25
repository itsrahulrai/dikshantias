import mongoose, { Document, Schema, Model } from "mongoose";

export interface ILesson {
  title: string;
  video_url: string;
  description?: string;
}

export interface IReview {
  name: string;
  rating: number;
  comment: string;
}

export interface ICourse extends Document {
  title: string;
  subtitle?: string;
  image: {
    url: string;
    public_url?: string;
    public_id?: string;
  };
  language?: string;
  duration?: string;
  lectures?: number;
  price?: number;
  discounted_price?: number;
  mode?: string;
  lessons: ILesson[];
  reviews: IReview[];
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const LessonSchema: Schema = new Schema({
  title: { type: String, required: true },
  video_url: { type: String, required: true },
  description: { type: String },
});

const ReviewSchema: Schema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: {
      url: { type: String, required: true },
      public_url: { type: String },
      public_id: { type: String },
    },
    language: { type: String },
    duration: { type: String },
    lectures: { type: Number },
    price: { type: Number },
    discounted_price: { type: Number },
    mode: { type: String },
    lessons: [LessonSchema],
    reviews: [ReviewSchema],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> =
  mongoose.models.Course ||
  mongoose.model<ICourse>("Course", CourseSchema, "courses");

export default CourseModel;
