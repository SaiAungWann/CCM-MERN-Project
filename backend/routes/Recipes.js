const express = require("express");
const handleErrorMessage = require("../middleware/handleErrorMessage");
const { body } = require("express-validator");
const RecipeController = require("../controller/RecipeController");
const router = express.Router();
const upload = require("../controller/helper/upload");

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
router.delete("/:id", RecipeController.destroy);
router.patch("/:id", RecipeController.update);
router.post(
  "/:id/upload",
  upload.single("recipePhoto"),
  RecipeController.upload
);

module.exports = router;
