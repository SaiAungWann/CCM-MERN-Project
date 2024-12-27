const Recipe = require("../model/Recipe");
const mongoose = require("mongoose");
const removeFile = require("../controller/helper/removeFile");
const User = require("../model/User");
const emailQueue = require("../queues/emailQueue");

const RecipeController = {
  index: async (req, res) => {
    let limit = 6;
    let page = req.query.page || 1;
    let recipes = await Recipe.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    let totalRecipeCount = await Recipe.countDocuments();

    let totalPagesCount = Math.ceil(totalRecipeCount / limit);

    let links = {
      nextPage: totalPagesCount == page ? false : true,
      previousPage: page == 1 ? false : true,
      currentPage: page,
      loopableLinks: [],
    };

    //generate loopableLink array
    for (let index = 0; index < totalPagesCount; index++) {
      let number = index + 1;
      links.loopableLinks.push({ number });
    }

    let response = {
      links,
      data: recipes,
    };
    return res.json(response);
  },
  store: async (req, res) => {
    try {
      const { title, description, ingredients } = req.body;

      const recipe = await Recipe.create({
        title,
        description,
        ingredients,
      });
      // send email

      // find user email
      let users = await User.find(null, ["email"]);
      let emails = users.map((user) => user.email);
      emails.filter((email) => email != req.user.email);
      // send email when created new recipe

      emailQueue.add({
        viewFileName: "email",
        data: {
          name: req.user.name,
          recipe,
        },
        from: req.user.email,
        to: emails,
        subject: "New Recipe Created",
      });

      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
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
  destroy: async (req, res) => {
    try {
      let id = req.params.id;

      // check if recipe type is correct

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }

      let recipe = await Recipe.findByIdAndDelete(id);

      // delete image
      await removeFile(__dirname + "/../public" + recipe.recipePhoto);

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

      await removeFile(__dirname + "/../public" + recipe.recipePhoto);

      if (!recipe) {
        return res.status(404).json({ message: "Recipe Not found" });
      }
      return res.json(recipe);
    } catch (error) {
      return res.status(404).json({ message: "Recipe Not found" });
    }
  },
  upload: async (req, res) => {
    try {
      let id = req.params.id;

      // check if recipe type is correct

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }

      let recipe = await Recipe.findByIdAndUpdate(id, {
        recipePhoto: "/img/uploads/" + req.file.filename,
      });

      if (!recipe) {
        return res.status(404).json({ message: "Recipe Not found" });
      }

      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = RecipeController;
