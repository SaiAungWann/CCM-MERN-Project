const mongoose = require("mongoose");
const RecipeController = require("../controller/RecipeController");

const schema = mongoose.Schema;

const RecipeSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
