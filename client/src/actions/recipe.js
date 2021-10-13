import {
  SET_MESSAGE,
} from "./types";

import RecipeService from "../services/recipe";

export const getRecipes = (body) => (dispatch) => {
  return RecipeService.getRecipes(body).then(
    (data) => {
      // let message = {};
      // message.text = data.toString();
      // message.severity = 'success';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: data,
      // });

      return Promise.resolve(data);
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });

      return Promise.reject();
    }
  );
};

export const search = (body) => (dispatch) => {
  return RecipeService.search(body).then(
    (data) => {
      // let message = {};
      // message.text = data.toString();
      // message.severity = 'success';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: data,
      // });

      return Promise.resolve(data);
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });

      return Promise.reject();
    }
  );
};

export const getFullRecipe = (body) => (dispatch) => {
  return RecipeService.getFullRecipe(body).then(
    (data) => {
      // let message = {};
      // message.text = data.toString();
      // message.severity = 'success';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: data,
      // });

      return Promise.resolve(data);
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });

      return Promise.reject();
    }
  );
};

export const getFullRecipeToEdit = (body) => (dispatch) => {
  return RecipeService.getFullRecipeToEdit(body).then(
    (data) => {
      // let message = {};
      // message.text = data.toString();
      // message.severity = 'success';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: data,
      // });

      return Promise.resolve(data);
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });

      return Promise.reject();
    }
  );
};

export const getContributorRecipes = (body) => (dispatch) => {
  return RecipeService.getContributorRecipes(body).then(
    (data) => {
      // let message = {};
      // message.text = data.toString();
      // message.severity = 'success';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: data,
      // });

      return Promise.resolve(data);
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const createRecipe = (recipe) => (dispatch) => {
  return RecipeService.createRecipe(recipe).then(
    (data) => {
      let message = {};
      message.text = "Recipe Created";
      message.severity = 'success';

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });

      return Promise.resolve(data);
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const editRecipeDetails = (recipe) => (dispatch) => {
  return RecipeService.editRecipeDetails(recipe).then(
    (data) => {
      let message = {};
      message.text = data.toString();
      message.severity = 'success';

      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const editRecipeSteps = (recipe) => (dispatch) => {
  return RecipeService.editRecipeSteps(recipe).then(
    (data) => {
      let message = {};
      message.text = data.toString();
      message.severity = 'success';

      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteRecipe = (rid) => (dispatch) => {
  return RecipeService.deleteRecipe(rid).then(
    (data) => {
      let message = {};
      message.text = data.toString();
      message.severity = 'success';

      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteRecipeSteps = (sid) => (dispatch) => {
  return RecipeService.deleteRecipeSteps(sid).then(
    (data) => {
      let message = {};
      message.text = data.toString();
      message.severity = 'success';

      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const likeRecipe = (recipe) => (dispatch) => {
  return RecipeService.likeRecipe(recipe).then(
    (data) => {
      let message = {};
      message.text = data.toString();
      message.severity = 'success';

      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const unlike = (uid, rid) => (dispatch) => {
  return RecipeService.unlike(uid, rid).then(
    (data) => {
      let message = {};
      message.text = data.toString();
      message.severity = 'success';

      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
