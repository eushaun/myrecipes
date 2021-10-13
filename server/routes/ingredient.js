const { Router } = require("express");
const ingredientController = require("../controllers/ingredientController");

const router = Router();

router.get("/", ingredientController.getIngredient);

router.post("/", ingredientController.addRecipeIngredients);

router.put("/", ingredientController.editRecipeIngredients);

router.delete("/:qid([0-9]+)", ingredientController.deleteRecipeIngredients);

module.exports = router;
