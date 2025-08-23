import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  shortContent: string;
  content: string;
  category: mongoose.Types.ObjectId;
  postedBy: string;
  image: {
    url: string;
    public_url: string;
    public_id: string;
    alt?: string;
  };
  tags?: string[];
  active: boolean;

  // SEO / Meta Fields
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  index?: boolean;
  follow?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortContent: { type: String, required: true },
    content: { type: String, required: true },
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "BlogCategory",
      required: true 
    },
    postedBy: { type: String, required: true },
    image: {
      url: { type: String, required: true },
      public_url: { type: String},
      public_id: { type: String},
      alt: { type: String },
    },
    tags: { type: [String], default: [] },
    active: { type: Boolean, default: true },

    // SEO / Meta Fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: [String], default: [] },
    canonicalUrl: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    index: { type: Boolean, default: true },
    follow: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BlogsModel: Model<IBlog> =
  mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema, "blogs");

export default BlogsModel;
