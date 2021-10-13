const ingredientRepository = require('../repositories/ingredientRepository');

let updateRecommendRecipes = () => {
  return new Promise(function (resolve, reject) {
    let result = "";
    let resultError = "";
    const { spawn } = require('child_process');
    const pyprog = spawn('python3', [__dirname + '/../recommender/update.py']);

    pyprog.stdout.on('data', () => {
    });

    pyprog.stderr.on('data', (data) => {
      resultError += data.toString();
    });

    pyprog.stdout.on("end", function () {
      if (resultError == "") {
        resolve();
      } else {
        const error = new Error(resultError);
        reject(error);
      }
    })
  })
};

exports.getIngredient = (ingredient) => {
  return new Promise((resolve, reject) => {
    if (!ingredient) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Ingredient not specified";
      return reject(err)
    }
    try {
      resolve(ingredientRepository.getOne(ingredient));
    } catch (err) {
      return reject(err);
    }
  });
};

exports.getIngredientsForRecipe = (rid) => {
  return new Promise((resolve, reject) => {
    if (!rid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "RID not specified";
      return reject(err)
    }
    try {
      resolve(ingredientRepository.getIngredientsForRecipe(rid));
    } catch (err) {
      return reject(err);
    }
  });
};

exports.addRecipeIngredients = (ingredients) => {
  return new Promise(async (resolve, reject) => {
    if (!ingredients) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Ingredients required";
      return reject(err)
    }
    try {
      const result = ingredientRepository.addRecipeIngredients(ingredients);
      await updateRecommendRecipes()
        .then(() => {
          resolve(result);
        }).catch((err) => {
          err.status = 500;
          console.log(err);
          return reject(err);
        });
    } catch (err) {
      return reject(err);
    }
  });
}

exports.editRecipeIngredients = (ingredients) => {
  return new Promise(async (resolve, reject) => {
    if (!ingredients) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Ingredients required";
      return reject(err)
    }
    try {
      const result = await ingredientRepository.editRecipeIngredients(ingredients);
      await updateRecommendRecipes()
        .then(() => {
          resolve(result);
        }).catch((err) => {
          err.status = 500;
          console.log(err);
          return reject(err);
        });
    } catch (err) {
      return reject(err);
    }
  });
}

exports.deleteRecipeIngredients = (qid) => {
  return new Promise(async (resolve, reject) => {
    if (!qid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Ingredient required";
      return reject(err)
    }
    try {
      const result = await ingredientRepository.deleteRecipeIngredients(qid);
      await updateRecommendRecipes()
        .then(() => {
          resolve(result);
        }).catch((err) => {
          err.status = 500;
          console.log(err);
          return reject(err);
        });
    } catch (err) {
      err.status = 500;
      return reject(err);
    }
  });
}
