const ingredientService = require('../services/ingredientService');

exports.getIngredient = async (req, res) => {
  const ingredient = req.query.ingredient;

  try {
    const result = await ingredientService.getIngredient(ingredient);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

exports.addRecipeIngredients = async (req, res) => {
  const ingredients = req.body.ingredients;

  try {
    const result = await ingredientService.addRecipeIngredients(ingredients);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};


exports.editRecipeIngredients = async (req, res) => {
  const ingredients = req.body.ingredients;
  try {
    const result = await ingredientService.editRecipeIngredients(ingredients);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

exports.deleteRecipeIngredients = async (req, res) => {
  const qid = req.params.qid;
  try {
    const result = await ingredientService.deleteRecipeIngredients(qid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};
