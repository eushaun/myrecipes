import axios from "axios";

const getIngredient = async (ingredient) => {
  try {
    const res = await axios.get(`http://localhost:3000/ingredient?ingredient=${ingredient}`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
}

const addRecipeIngredients = async (ingredients) => {
  try {
    const res = await axios.post('http://localhost:3000/ingredient', ingredients);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
}

const editRecipeIngredients = async (recipe) => {
  try {
    const res = await axios.put('http://localhost:3000/ingredient', recipe);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
}

const deleteRecipeIngredients = async (qid) => {
  try {
    console.log("Services", qid)
    const res = await axios.delete(`http://localhost:3000/ingredient/${qid}`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getIngredient,
  addRecipeIngredients,
  editRecipeIngredients,
  deleteRecipeIngredients
};
