const recipeService = require('../services/recipeService');
const ingredientService = require('../services/ingredientService');

/**
 * Display recipes for user that is not logged in.
 * The recipes will be based on latest recipes added to the database.
 */
exports.getAll = async (req, res) => {
  const uid = req.query.uid;
  try {
    const result = await recipeService.getAll(uid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

/**
 * Display recipes based on user's preferences such as recipes viewed and contributors subscribed to
 */
exports.getRecommended = async (req, res) => {
  const uid = req.query.uid;
  const rid = req.query.rid;

  try {
    const result = await recipeService.getRecommended(uid, rid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

exports.getRecommendedFeed = async (req, res) => {
  const uid = req.query.uid;
  try {
    const result = await recipeService.getRecommendedFeed(uid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

/**
 * Display the complete recipe for explorer
 * Includes number of likes and comments
 */
exports.getFullRecipe = async (req, res) => {
  const subid = req.query.subid;
  const conid = req.query.conid;
  const rid = req.query.rid;

  try {
    const result = await recipeService.getRecipeDetails(subid, conid, rid);
    const ingredients = await ingredientService.getIngredientsForRecipe(rid);

    let recipe = {};
    recipe['rid'] = result[0]['rid'];
    recipe['title'] = result[0]['title'];
    recipe['description'] = result[0]['description'];
    recipe['rdate'] = result[0]['rdate'];
    recipe['rtime'] = result[0]['rtime'];
    recipe['cuisine'] = result[0]['cuisine'];
    recipe['mealtype'] = result[0]['mealtype'];
    recipe['video'] = result[0]['video'];
    recipe['main_image'] = result[0]['main_image'];
    recipe['uid'] = result[0]['uid'];
    recipe['name'] = result[0]['first_name'] + ' ' + result[0]['last_name'];
    recipe['profile_pic'] = result[0]['profile_pic'];
    recipe['likes'] = result[0]['likes'];
    recipe['comments'] = result[0]['comments_count'];
    recipe['liked'] = result[0]['liked'];
    recipe['subscribed'] = result[0]['subscribed'];
    recipe['prep_time'] = result[0]['prep_time'];
    recipe['cook_time'] = result[0]['cook_time'];
    recipe['method'] = result[0]['method'];
    let steps = [];
    result.map(row => {
      let step = {}
      step['sid'] = row['sid']
      step['instructions'] = row['instructions']
      step['image'] = row['image']
      step['timer'] = row['timer']
      steps.push(step);
    });

    res.status(200).send([recipe, steps, ingredients]);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

/**
 * Display the complete recipe for contributor to edit
 * Does not include number of like and comments
 */
exports.getFullRecipeToEdit = async (req, res) => {
  const uid = req.query.uid;
  const rid = req.query.rid;

  try {
    const result = await recipeService.getRecipeDetails(uid, uid, rid);
    const ingredients = await ingredientService.getIngredientsForRecipe(rid);

    let recipe = {};
    recipe['rid'] = result[0]['rid'];
    recipe['title'] = result[0]['title'];
    recipe['description'] = result[0]['description'];
    recipe['cuisine'] = result[0]['cuisine'];
    recipe['mealtype'] = result[0]['mealtype'];
    recipe['video'] = result[0]['video'];
    recipe['main_image'] = result[0]['main_image'];
    recipe['prep_time'] = result[0]['prep_time'];
    recipe['cook_time'] = result[0]['cook_time'];
    recipe['method'] = result[0]['method'];

    let steps = [];
    result.map(row => {
      let step = {}
      step['sid'] = row['sid']
      step['instructions'] = row['instructions']
      step['image'] = row['image']
      step['timer'] = row['timer']
      steps.push(step);
    });

    res.status(200).send([recipe, steps, ingredients]);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

/**
 * Display the all the recipes for that contributor
 */
exports.getContributorRecipes = async (req, res) => {
  const uid = req.query.uid;
  const conid = req.query.conid;

  try {
    const result = await recipeService.getContributorRecipes(uid, conid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

/**
 * Creates a recipe
 * returns message
 */
exports.createRecipe = async (req, res) => {
  const recipe = req.body.recipe;
  const steps = req.body.instructions;
  const quantities = req.body.quantities;

  try {
    const result = await recipeService.createRecipe(recipe, steps, quantities);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

exports.uploadImages = async (req, res) => {
  const images = req.body.images;
  const recipe_images = JSON.parse(images);
  try {
    const result = await recipeService.uploadImages(recipe_images);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

exports.uploadSteps = async (req, res) => {
  const images = req.body.images;
  const steps_images = JSON.parse(images);
  try {
    const result = await recipeService.uploadSteps(steps_images);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

exports.addRecipeSteps = async (req, res) => {
  const steps = req.body.steps;

  try {
    const result = await recipeService.addRecipeSteps(steps);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};


/**
 * Modify recipe details
 */
exports.editRecipeDetails = async (req, res) => {
  const recipe = req.body.recipe;

  try {
    const result = await recipeService.editRecipeDetails(recipe);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

/**
 * Modify recipe details
 */
exports.editRecipeSteps = async (req, res) => {
  const steps = req.body.steps;

  try {
    const result = await recipeService.editRecipeSteps(steps);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};


/**
 * Delete recipe
 */
exports.deleteRecipe = async (req, res) => {
  const rid = req.params.rid;

  try {
    const result = await recipeService.deleteRecipe(rid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

exports.deleteRecipeSteps = async (req, res) => {
  const sid = req.params.sid;
  try {
    const result = await recipeService.deleteRecipeSteps(sid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

/** Search */

exports.searchRecipe = async (req, res) => {
  const uid = req.query.uid;
  const title = req.query.q;
  try {
    const result = await recipeService.searchRecipe(uid, title);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};


/** Likes */

exports.likeRecipe = async (req, res) => {
  const uid = req.body.uid;
  const rid = req.body.rid;

  try {
    const result = await recipeService.likeRecipe(uid, rid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};

exports.unlikeRecipe = async (req, res) => {
  const uid = req.params.uid;
  const rid = req.params.rid;

  try {
    const result = await recipeService.unlikeRecipe(uid, rid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err)
  }
};
