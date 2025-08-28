import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResult extends Document {
  name: string;
  rank: number;
  service: string;
  year: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ResultSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    rank: { type: Number, required: true },
    service: { type: String, required: true },
    year: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const ResultModel: Model<IResult> =
  mongoose.models.Result || mongoose.model<IResult>("Result", ResultSchema, "results");

export default ResultModel;
