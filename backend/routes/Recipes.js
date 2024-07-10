const express = require("express");
const handleErrorMessage = require("../middleware/handleErrorMessage");
const { body } = require("express-validator");
const RecipeController = require("../controller/RecipeController");
const router = express.Router();

router.get("", RecipeController.index);
router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingredients").notEmpty(),
    body("ingredients").isArray({ min: 1 }),
  ],
  handleErrorMessage,
  RecipeController.store
);
router.get("/:id", RecipeController.show);
router.delete("/:id", RecipeController.destory);
router.patch("/:id", RecipeController.update);

module.exports = router;
