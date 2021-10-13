import axios from "axios";

const getRecipes = async (body) => {
  try {
    const res = await axios.get('http://localhost:3000/recipe', { params: body });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
};

const search = async (body) => {
  try {
    const res = await axios.get('http://localhost:3000/recipe/search', { params: body });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
};

const getFullRecipe = async (body) => {
  try {
    const res = await axios.get('http://localhost:3000/recipe/full', { params: body });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getFullRecipeToEdit = async (body) => {
  try {
    const res = await axios.get('http://localhost:3000/recipe/contributor-recipe', { params: body });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getContributorRecipes = async (body) => {
  try {
    const res = await axios.get('http://localhost:3000/recipe/contributor', { params: body });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const createRecipe = async (recipe) => {
  try {
    const res = await axios.post('http://localhost:3000/recipe', recipe);
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

const editRecipeDetails = async (recipe) => {
  try {
    const res = await axios.put('http://localhost:3000/recipe/details', recipe);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const editRecipeSteps = async (recipe) => {
  try {
    const res = await axios.put('http://localhost:3000/recipe/steps', recipe);
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

const deleteRecipe = async (rid) => {
  try {
    const res = await axios.delete(`http://localhost:3000/recipe/${rid}`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const deleteRecipeSteps = async (sid) => {
  try {
    const res = await axios.delete(`http://localhost:3000/recipe/steps/${sid}`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const likeRecipe = async (recipe) => {
  try {
    const res = await axios.post('http://localhost:3000/recipe/like', recipe);
    return Promise.reject(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const unlikeRecipe = async (uid, rid) => {
  try {
    const res = await axios.delete(`http://localhost:3000/recipe/unlike?${uid}/${rid}`);
    return Promise.reject(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getRecipes,
  search,
  getFullRecipe,
  getFullRecipeToEdit,
  getContributorRecipes,
  createRecipe,
  editRecipeDetails,
  editRecipeSteps,
  deleteRecipe,
  deleteRecipeSteps,
  likeRecipe,
  unlikeRecipe
};
