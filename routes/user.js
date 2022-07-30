const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const userController = require("../controllers/user.controller");

/**
 * ==============================
 * Edit a user
 * ==============================
 */
router.put("/:id", userController.editUser);

/**
 * ==============================
 * Delete a user
 * ==============================
 */
router.delete("/:id", userController.deleteUser);

/**
 * ==============================
 * Get user
 * ==============================
 */
router.get("/:id", userController.getUser);

module.exports = router;
