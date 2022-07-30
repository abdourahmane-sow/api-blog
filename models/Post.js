const mongose = require("mongoose");

const PostSchema = new mongose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true
    },
    categories: {
        type: Array,
        required: false
    }
  },
  { timestamps: true }
);

module.exports = mongose.model("Post",PostSchema);
