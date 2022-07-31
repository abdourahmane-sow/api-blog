const Post = require("../models/Post");

/**
 * ==============================
 * Post create controller
 * ==============================
 */
module.exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    if (savePost) res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * ==============================
 * Post edit controller
 * ==============================
 */
module.exports.editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post && post.username === req.body.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (updatedPost) res.status(200).json(updatedPost);
    } else {
      res.status(401).json("You can only update your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * ==============================
 * Post delete controller
 * ==============================
 */
module.exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (post && post.username === req.body.username) {
      const deletedPost = await post.delete();
      if (deletedPost) res.status(200).json("Post have been deleted");
    } else {
      res.status(401).json("You can only delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * ==============================
 * Post get controller
 * ==============================
 */

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * ==============================
 * Get all post controller
 * ==============================
 */

module.exports.getAllPosts = async (req, res) => {
  try {
    let posts;
    const username = req.query.user;
    const catName = req.query.cat;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    if (posts) res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
