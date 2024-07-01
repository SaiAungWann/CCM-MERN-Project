const RecipeController = {
  index: (req, res) => {
    return res.json({ message: "Get all recipes" });
  },
  store: (req, res) => {
    return res.json({ message: "Store recipes" });
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
