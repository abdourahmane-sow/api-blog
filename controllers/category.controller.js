const Category = require("../models/Category");

/**
 * ==============================
 * Category create controller
 * ==============================
 */
module.exports.createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const saveCategory = await newCategory.save();
    if (saveCategory) res.status(200).json(saveCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * ==============================
 * Category getAll controller
 * ==============================
 */
module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories) res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};
