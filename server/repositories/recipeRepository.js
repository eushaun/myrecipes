const db = require('../db');
const async = require('async');
/**
 * Display recipes for user that is not logged in.
 * The recipes will be based on latest recipes added to the database.
 */
exports.getAll = (uid) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM general_feed($1)', [uid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "No recipes found";
        return reject(err);
      }
      resolve({ "response": result['rows'] });
    });
  });
};

/**
 * Display recipes based on user's preferences such as recipes viewed and contributors subscribed to
 */
exports.getRecommended = (uid, rids) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recommended($1, $2)', [uid, rids], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Recipes not found";
        return reject(err);
      }
      resolve(result['rows']);
    });
  });
};

/**
 * Display the complete recipe for explorer
 * Includes number of likes and comments
 */
exports.getRecipeDetails = (subscriberId, contributorId, recipeId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM full_recipe($1, $2, $3)', [subscriberId, contributorId, recipeId], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Recipe not found";
        return reject(err);
      }
      resolve(result['rows']);
    });
  });
};

/**
 * Display the all the recipes for that contributor
 */
exports.getContributorRecipes = (uid, conid) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user_recipes($1, $2)', [uid, conid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "No recipes found";
        return reject(err);
      }
      resolve(result['rows']);
    });
  });
};

/**
 * Creates a recipe
 * returns message
 */
exports.createRecipe = (recipe, steps, quantities) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM create_recipe($1::json, $2, $3)', [recipe, steps, quantities], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      resolve({ "response": result['rows'] });
    });
  });
};

exports.uploadImages = (images) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE recipes SET image = $1 WHERE rid = $2', [images.main_image, images.rid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      resolve({ "response": "Uploaded" });
    });
  });
};

exports.uploadSteps = (images) => {
  return new Promise((resolve, reject) => {
    async.forEachOf(images['steps'], function (image, _, inner_callback) {
      db.query('UPDATE steps SET image = $1 WHERE rid = $2 AND sid = $3', [image.image, images.rid, image.sid], function (err, result, _fields) {
        if (err) {
          err.status = 500;
          return inner_callback(err);
        }
        if (!result) {
          let err = new Error(404);
          err.status = 404;
          err.response = "Step or Recipe for step does not exist";
          return inner_callback(err);
        }
        inner_callback();
      });
    }, function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ "response": "Uploaded" });
    });
  });
};

exports.addRecipeSteps = (step) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO steps (rid, instructions, image, timer) VALUES ($1, $2, $3, $4) RETURNING sid', [step.rid, step.instructions, step.image, step.timer], function (err, result, _fields) {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Step or Recipe for step does not exist";
        return reject(err);
      }
      resolve({ "response": result['rows'] });
    });
    // async.forEachOf(steps, function (step, _, inner_callback) {
    // }, function (err) {
    //   if (err) {
    //     return reject(err);
    //   }
    //   resolve({ "response": "Recipe steps added" });
    // });
  });
};


/**
 * Modify recipe details
 */
exports.editRecipeDetails = (recipe) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE recipes SET title = $1, description = $2, cuisine = $3, mealtype = $4, video = $5, image = $6, prep_time = $7, cook_time = $8 WHERE rid = $9', [recipe.title, recipe.description, recipe.cuisine, recipe.mealtype, recipe.video, recipe.image, recipe.prep_time, recipe.cook_time, recipe.rid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Recipe does not exist";
        return reject(err);
      }
      resolve({ "response": "Recipe details updated" });
    });
  });
};

/**
 * Modify recipe steps
 */
exports.editRecipeSteps = (steps) => {
  return new Promise((resolve, reject) => {
    async.forEachOf(steps, function (step, _, inner_callback) {
      db.query('UPDATE steps SET instructions = $1, image = $2, timer = $3 WHERE sid = $4 AND rid = $5', [step.instructions, step.image, step.timer, step.sid, step.rid], function (err, result, _fields) {
        if (err) {
          err.status = 500;
          return inner_callback(err);
        }
        if (result['rowCount'] == 0) {
          let err = new Error(404);
          err.status = 404;
          err.response = "Step or Recipe for step does not exist";
          return inner_callback(err);
        }
        inner_callback();
      });
    }, function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ "response": "Recipe steps updated" });
    });
  });
};


/**
 *
 * @param {number} rid
 * @returns {Promise}
 */
exports.deleteRecipe = (rid) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM recipes WHERE rid = $1', [rid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Recipe does not exist";
        return reject(err);
      }
      resolve({ "response": "Recipe deleted" });
    });
  });
};

exports.deleteRecipeSteps = (sid) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM steps WHERE sid = $1', [sid], function (err, result, _fields) {
      if (err) {
        err.status = 500;
        return reject(err);
      } else {
        if (result && result['rowCount'] == 0) {
          let err = new Error(404);
          err.status = 404;
          err.response = "Step does not exist";
          return reject(err);
        }
        resolve({ "response": "Step(s) deleted" });
      }
    });
    // async.forEachOf(steps, function (step, _, inner_callback) {
    // }, function (err) {
    //   if (err) {
    //     return reject(err);
    //   }
    //   resolve({ "response": "Step(s) deleted" });
    // });
  });
};



/** Search */

exports.searchRecipe = (uid, title) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM search($1, $2)', [uid, title], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "No recipes found";
        return reject(err);
      }
      resolve({ "response": result['rows'] });
    });
  });
};


/** Likes */

exports.likeRecipe = (uid, rid) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO likes VALUES($1, $2)', [uid, rid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Recipe does not exist";
        return reject(err);
      }
      resolve({ "response": "Liked" });
    });
  });
};

exports.unlikeRecipe = (uid, rid) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM likes WHERE uid = $1 AND rid = $2', [uid, rid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Recipe does not exist";
        return reject(err);
      }
      resolve({ "response": "Unliked" });
    });
  });
};
