import Category from "../models/categoryModel.js"

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
      } catch (err) {
        res.status(500).json({ error: err });
      }
  };

  export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category ({
            category: req.body.category
        });
        await newCategory.save();
        res.status(201).json(newCategory);
        console.log(Category)
    } catch (error) {
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
  }