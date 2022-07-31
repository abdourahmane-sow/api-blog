const mongose = require("mongoose");

const CategorySchema = new mongose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongose.model("Category",CategorySchema);
