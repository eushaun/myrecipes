const recipeRepository = require('../repositories/recipeRepository');

exports.getAll = (uid) => {
  return new Promise((resolve, reject) => {
    if (!uid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "UID cannot be empty";
      return reject(err)
    }
    try {
      resolve(recipeRepository.getAll(uid));
    } catch (err) {
      return reject(err);
    }
  });
};

let recommendRecipes = (rid) => {
  return new Promise(function (resolve, reject) {
    let result = "";
    let resultError = "";
    const { spawn } = require('child_process');
    const pyprog = spawn('python3', [__dirname + '/../recommender/recommender.py', rid]);

    pyprog.stdout.on('data', function (data) {
      result += data.toString();
    });

    pyprog.stderr.on('data', (data) => {
      resultError += data.toString();
    });

    pyprog.stdout.on("end", function () {
      if (resultError == "") {
        resolve(JSON.parse(result));
      } else {
        const error = new Error(resultError);
        console.error(error);
        reject(resultError);
      }
    })
  })
};

let recommendRecipesFeed = (uid) => {
  return new Promise(function (resolve, reject) {
    let result = "";
    let resultError = "";
    const { spawn } = require('child_process');
    const pyprog = spawn('python3', [__dirname + '/../recommender/feed.py', uid]);

    pyprog.stdout.on('data', function (data) {
      result += data.toString();
    });

    pyprog.stderr.on('data', (data) => {
      resultError += data.toString();
    });

    pyprog.stdout.on("end", function () {
      if (resultError == "") {
        console.log(result)
        resolve(JSON.parse(result));
      } else {
        const error = new Error(resultError);
        error.status = 500;
        console.error(error);
        reject(resultError);
      }
    })
  })
};

exports.getRecommended = (uid, rid) => {
  return new Promise((resolve, reject) => {
    if (!uid || !rid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "UID or RID cannot be empty";
      return reject(err)
    }
    try {
      recommendRecipes(rid)
        .then((rids) => {
          resolve(recipeRepository.getRecommended(uid, rids));
        }).catch((err) => {
          err.status = 500;
          return reject(err);
        });
    } catch (err) {
      return reject(err);
    }
  });
};

exports.getRecommendedFeed = (uid) => {
  return new Promise((resolve, reject) => {
    if (!uid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "UID cannot be empty";
      return reject(err)
    }
    try {
      recommendRecipesFeed(uid)
        .then((rids) => {
          console.log(rids);
          resolve(recipeRepository.getRecommended(uid, rids));
        }).catch((err) => {
          err.status = 500;
          console.error(err);
          return reject(err);
        });
    } catch (err) {
      err.status = 500;
      console.error(err);
      return reject(err);
    }
  });
};


exports.getRecipeDetails = (subscriberId, contributorId, recipeId) => {
  return new Promise(async (resolve, reject) => {
    if (!subscriberId || !contributorId || !recipeId) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or more fields missing";
      return reject(err)
    }
    try {
      const recipe = await recipeRepository.getRecipeDetails(subscriberId, contributorId, recipeId);
      resolve(recipe);
    } catch (err) {
      return reject(err);
    }
  });
};

exports.getContributorRecipes = (uid, contributorId) => {
  return new Promise(async (resolve, reject) => {
    if (!uid || !contributorId) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or more fields missing";
      return reject(err)
    }
    try {
      const recipes = await recipeRepository.getContributorRecipes(uid, contributorId);
      resolve(recipes);
    } catch (err) {
      return reject(err);
    }
  });
};

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


exports.createRecipe = (recipe, steps, quantities) => {
  return new Promise(async (resolve, reject) => {
    if (!recipe || !steps || !quantities) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or more fields missing";
      return reject(err)
    }
    try {
      const result = await recipeRepository.createRecipe(recipe, steps, quantities);
      await updateRecommendRecipes()
        .then(() => {
          resolve(result);
        }).catch((err) => {
          err.status = 500;
          console.log(err);
          return reject(err);
        });
      resolve(result);
    } catch (err) {
      err.status = 500;
      console.log(err);
      return reject(err);
    }
  });
}

exports.uploadImages = (images) => {
  return new Promise(async (resolve, reject) => {
    if (!images) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Images missing";
      return reject(err)
    }
    try {
      images.main_image = "https://myrecipes-images.s3.us-east-2.amazonaws.com/recipe/" + images.main_image;
      const result = await recipeRepository.uploadImages(images);
      resolve(result);
    } catch (err) {
      err.status = 500;
      console.log(err);
      return reject(err);
    }
  });
};

exports.uploadSteps = (images) => {
  return new Promise(async (resolve, reject) => {
    if (!images) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Images missing";
      return reject(err)
    }
    try {
      for (let i = 0; i < images['steps'].length; i++) {
        images['steps'][i]['image'] = "https://myrecipes-images.s3.us-east-2.amazonaws.com/recipe/" + images['steps'][i]['image'];
      }
      const result = await recipeRepository.uploadSteps(images);
      resolve(result);
    } catch (err) {
      err.status = 500;
      console.log(err);
      return reject(err);
    }
  });
};

exports.addRecipeSteps = (steps) => {
  return new Promise(async (resolve, reject) => {
    if (!steps) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Steps required";
      return reject(err)
    }
    try {
      const result = await recipeRepository.addRecipeSteps(steps)
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

exports.editRecipeDetails = (recipe) => {
  return new Promise(async (resolve, reject) => {
    if (!recipe) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Recipe required";
      return reject(err)
    }
    try {
      const result = await recipeRepository.editRecipeDetails(recipe);
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

exports.editRecipeSteps = (steps) => {
  return new Promise(async (resolve, reject) => {
    if (!steps) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Steps required";
      return reject(err)
    }
    try {
      const result = recipeRepository.editRecipeSteps(steps);
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


exports.deleteRecipe = (rid) => {
  return new Promise(async (resolve, reject) => {
    if (!rid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Recipe required";
      return reject(err)
    }
    try {
      const result = await recipeRepository.deleteRecipe(rid);
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

exports.deleteRecipeSteps = (sid) => {
  return new Promise(async (resolve, reject) => {
    if (!sid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Steps required";
      return reject(err)
    }
    try {
      const result = recipeRepository.deleteRecipeSteps(sid);
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

exports.searchRecipe = (uid, title) => {
  return new Promise((resolve, reject) => {
    if (!uid || !title) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or more fields missing";
      return reject(err)
    }
    try {
      resolve(recipeRepository.searchRecipe(uid, title));
    } catch (err) {
      return reject(err);
    }
  });
}

exports.likeRecipe = (uid, rid) => {
  return new Promise((resolve, reject) => {
    if (!uid || !rid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or more fields missing";
      return reject(err)
    }
    try {
      resolve(recipeRepository.likeRecipe(uid, rid));
    } catch (err) {
      return reject(err);
    }
  });
}

exports.unlikeRecipe = (uid, rid) => {
  return new Promise((resolve, reject) => {
    if (!uid || !rid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or more fields missing";
      return reject(err)
    }
    try {
      resolve(recipeRepository.unlikeRecipe(uid, rid));
    } catch (err) {
      return reject(err);
    }
  });
}
