import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: {},
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,

      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", Product);
