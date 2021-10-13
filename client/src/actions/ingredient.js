import {
  SET_MESSAGE,
} from "./types";

import IngredientService from "../services/ingredient";

export const getIngredient = (ingredient) => (dispatch) => {
  return IngredientService.getIngredient(ingredient).then(
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

export const addRecipeIngredients = (ingredients) => (dispatch) => {
  return IngredientService.addRecipeIngredients(ingredients).then(
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

export const editRecipeIngredients = (recipe) => (dispatch) => {
  return IngredientService.editRecipeIngredients(recipe).then(
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

export const deleteRecipeIngredients = (qid) => (dispatch) => {
  return IngredientService.deleteRecipeIngredients(qid).then(
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

      return Promise.reject(error);
    }
  );
};
