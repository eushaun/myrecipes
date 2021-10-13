const db = require('../db');
const async = require('async');

/**
 *
 * @param {number} ingredient
 * @returns {Promise}
 */
exports.getOne = (ingredient) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT iid, name FROM ingredients WHERE name iLIKE $1', ['%' + ingredient + '%'], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Ingredient not found";
        return reject(err);
      } else {
        resolve({ "response": result['rows'] });
      }
    });
  });
};

/**
 *
 * @param {number} recipeId
 * @returns {Promise}
 */
exports.getIngredientsForRecipe = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT q.quantity, q.technique, q.unit, q.qid, i.iid, i.name FROM quantities q INNER JOIN ingredients i ON q.iid = i.iid WHERE rid = $1', [recipeId], (err, result, _fields) => {
      if (err) {
        console.log("hi")
        err.status = 500;
        return reject(err);
      }
      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Ingredients not found";
        return reject(err);
      } else {
        resolve(result['rows']);
      }
    });
  });
};

exports.addRecipeIngredients = (ingredients) => {
  return new Promise((resolve, reject) => {
    async.forEachOf(ingredients, function (ingredient, _, inner_callback) {
      db.query('INSERT INTO quantities (rid, iid, technique, quantity, unit) VALUES($1, $2, $3, $4, $5)', [ingredient.rid, ingredient.iid, ingredient.technique, ingredient.quantity, ingredient.unit], function (err, result, _fields) {
        if (err) {
          err.status = 500;
          return inner_callback(err);
        } else {
          if (result && result['rowCount'] == 0) {
            let err = new Error(404);
            err.status = 404;
            err.response = "Ingredient or Recipe for ingredient does not exist";
            return inner_callback(err);
          } else {
            inner_callback();
          }
        }
      });
    }, function (err) {
      if (err) {
        return reject(err);
      } else {
        resolve({ "response": "Ingredients added" });
      }
    });
  });
};

/**
 *
 * @param {Array} ingredients
 * @returns {Promise}
 */
exports.editRecipeIngredients = (ingredients) => {
  return new Promise((resolve, reject) => {
    async.forEachOf(ingredients, function (ingredient, _, inner_callback) {
      db.query('UPDATE quantities SET technique = $1, quantity = $2, unit = $3, iid = $4 WHERE qid = $5 AND rid = $6', [ingredient.technique, ingredient.quantity, ingredient.unit, ingredient.iid, ingredient.qid, ingredient.rid], function (err, result, _fields) {
        if (err) {
          err.status = 500;
          return inner_callback(err);
        } else {
          if (result && result['rowCount'] == 0) {
            let err = new Error(404);
            err.status = 404;
            err.response = "Ingredient or Recipe for ingredient does not exist";
            return inner_callback(err);
          } else {
            inner_callback();
          }
        }
      });
    }, function (err) {
      if (err) {
        return reject(err);
      } else {
        resolve({ "response": "Ingredients updated" });
      }
    });
  });
};

/**
 *
 * @param {Array} ingredients
 * @returns {Promise}
 */
exports.deleteRecipeIngredients = (qid) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM quantities WHERE qid = $1', [qid], function (err, result, _fields) {
      if (err) {
        err.status = 500;
        return reject(err);
      } else {
        if (result && result['rowCount'] == 0) {
          let err = new Error(404);
          err.status = 404;
          err.response = "Ingredient does not exist";
          return reject(err);
        } else {
          resolve({ "response": "Ingredients deleted" });
        }
      }
      // async.forEachOf(ingredients, function (ingredient, _, inner_callback) {

      //   });
      // }, function (err) {
      //   if (err) {
      //     return reject(err);
      //   } else {
      //     resolve({ "response": "Ingredients deleted" });
      //   }
    });
  });
};
