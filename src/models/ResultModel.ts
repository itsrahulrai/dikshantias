import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResult extends Document {
  name: string;
  rank: number;
  service: string;
  year: string;
 image: {
    url: string;
    public_url: string;
    public_id: string;
  };
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ResultSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    rank: { type: Number, required: true },
    service: { type: String, required: true },
    year: { type: String, required: true },
    image: {
      url: { type: String, required: true },
      public_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ResultModel: Model<IResult> =
  mongoose.models.Result || mongoose.model<IResult>("Result", ResultSchema, "results");

export default ResultModel;
