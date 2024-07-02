const Recipe = require("../model/Recipe");
const RecipeController = {
  index: (req, res) => {
    return res.json({ message: "Get all recipes" });
  },
  store: async (req, res) => {
    try {
      const { title, description, ingredients } = req.body;

      const recipe = await Recipe.create({
        title,
        description,
        ingredients,
      });
      return res.json(recipe);
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  },
  show: (req, res) => {
    return res.json({ message: "Get single recipes" });
  },
  destory: (req, res) => {
    return res.json({ message: "delete recipes" });
  },
  update: (req, res) => {
    return res.json({ message: "update recipes" });
  },
};

module.exports = RecipeController;
