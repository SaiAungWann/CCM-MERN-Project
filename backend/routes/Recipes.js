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
  [
    upload.single("recipePhoto"),
    body("recipePhoto").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("No photo is uploaded");
      }
      if (
        // req.file.mimetype !== "image/jpeg" &&
        // req.file.mimetype !== "image/png"
        !req.file.mimetype.startsWith("image")
      ) {
        throw new Error("File type not supported");
      }
      return true;
    }),
  ],
  handleErrorMessage,
  RecipeController.upload
);

module.exports = router;
