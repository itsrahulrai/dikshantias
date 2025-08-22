// models/Slider.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface ISlider extends Document {
  title: string;
  image: {
    url: string;
    public_url: string;
    public_id: string;
  };
  displayOrder: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const SliderSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: {
      url: { type: String, required: true },
      public_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ Fix for Next.js hot reload & explicitly set collection name
const SliderModel: Model<ISlider> =
  mongoose.models.Slider ||
  mongoose.model<ISlider>("Slider", SliderSchema, "sliders");

export default SliderModel;
  