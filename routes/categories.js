const router = require("express").Router();
const categoryController = require("../controllers/category.controller");

/**
 * ==============================
 * Create a category route
 * ==============================
 */
router.post("/", categoryController.createCategory);


/**
 * ==============================
 * Get All a category route
 * ==============================
 */
 router.get("/", categoryController.getAllCategories);

module.exports = router;