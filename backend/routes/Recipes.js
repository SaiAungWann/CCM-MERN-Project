const express = require("express");

const app = express();
const RecipeController = require("../controller/RecipeController");
const router = express.Router();

router.get("", RecipeController.index);
router.post("", RecipeController.store);
router.get("/:id", RecipeController.show);
router.delete("/:id", RecipeController.destory);
router.patch("/:id", RecipeController.update);

module.exports = router;
