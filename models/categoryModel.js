import mongoose from "mongoose";

const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
});

export default mongoose.model("Category", Category);
