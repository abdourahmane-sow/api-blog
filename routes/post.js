const router = require("express").Router();
const postController = require("../controllers/post.controller");

/**
 * ==============================
 * Create a post route
 * ==============================
 */
router.post("/", postController.createPost);

/**
 * ==============================
 * Edit a post route
 * ==============================
 */
router.put("/:id", postController.editPost);

/**
 * ==============================
 * Delete a post route
 * ==============================
 */
router.delete("/:id", postController.deletePost);

/**
 * ==============================
 * Get a post route
 * ==============================
 */
 router.get("/:id", postController.getPost);

 /**
 * ==============================
 * Get all post route
 * ==============================
 */
  router.get("/", postController.getAllPosts);


module.exports = router;
