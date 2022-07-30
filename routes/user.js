const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

/**
 * ==============================
 * Edit a user
 * ==============================
 */
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json("You can only edit your account");
  }
});

/**
 * ==============================
 * Delete a user
 * ==============================
 */
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    const user = await User.findById(req.body.userId);
    try {
      if (user) {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json("User has been deleted");
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json("You can only delete your account");
  }
});

/**
 * ==============================
 * Get user
 * ==============================
 */
router.get("/:id", async(req,res)=> {
    try {
        const user = await User.findById(req.params.id);
        const {password, ... others} = user._doc;
        if (user) res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
