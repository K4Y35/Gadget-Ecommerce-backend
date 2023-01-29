import slugify from "slugify";
import Category from "../models/categoryModel.js";

export const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Category already exists" });
    }

    const newCategory = await new Category({
      name,
      slug: slugify(name),
    }).save();

    res.json(newCategory);
  } catch (error) {
    console.log(error);
  }
};

export const update = async (req, res) => {
  try {
    const { categoryID } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryID,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.json(category);
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (req, res) => {
  try {
    const { categoryID } = req.params;

    const removed = await Category.findByIdAndRemove(categoryID);

    res.json(removed);
  } catch (error) {
    console.log(error);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
  }
};

export const read = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    res.json(category);
  } catch (error) {
    console.log(error);
  }
};
