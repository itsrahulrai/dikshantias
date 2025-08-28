
import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICurrentAffairs extends Document {
  title: string;
  slug: string;
  shortContent: string;
  content: string;
  category: mongoose.Schema.Types.ObjectId;
  subCategory: mongoose.Schema.Types.ObjectId;
  image?: {
    url: string;
    public_id: string;
    public_url: string;
  };
  imageAlt?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CurrentAffairsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortContent: { type: String},
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "BlogCategory", required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory", required: true },
    image: {
      url: String,
      public_id: String,
      public_url: String,
    },
    imageAlt: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent model recompilation error in Next.js hot reload
const CurrentAffairs: Model<ICurrentAffairs> =
  mongoose.models.CurrentAffairs || mongoose.model("CurrentAffairs", CurrentAffairsSchema);

export default CurrentAffairs;
