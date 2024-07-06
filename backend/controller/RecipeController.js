const Recipe = require("../model/Recipe");
const mongoose = require("mongoose");

const RecipeController = {
  index: async (req, res) => {
    let recipe = await Recipe.find().sort({ createdAt: -1 });
    return res.json(recipe);
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
  show: async (req, res) => {
    try {
      let id = req.params.id;

      // check if recipe type is correct

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }

      let recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(404).json({ message: "Recipe Not found" });
      }
      return res.json(recipe);
    } catch (error) {
      return res.status(404).json({ message: "Recipe Not found" });
    }
  },
  destory: async (req, res) => {
    try {
      let id = req.params.id;

      // check if recipe type is correct

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }

      let recipe = await Recipe.findByIdAndDelete(id);

      if (!recipe) {
        return res.status(404).json({ message: "Recipe Not found" });
      }
      return res.json(recipe);
    } catch (error) {
      return res.status(404).json({ message: "Recipe Not found" });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;

      // check if recipe type is correct

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }

      let recipe = await Recipe.findByIdAndUpdate(id, { ...req.body });

      if (!recipe) {
        return res.status(404).json({ message: "Recipe Not found" });
      }
      return res.json(recipe);
    } catch (error) {
      return res.status(404).json({ message: "Recipe Not found" });
    }
  },
};

module.exports = RecipeController;
