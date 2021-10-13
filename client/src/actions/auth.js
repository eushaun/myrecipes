import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth";

export const register = (firstName, lastName, email, password) => (dispatch) => {
  return AuthService.register(firstName, lastName, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response,
      });

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: response,
      // });

      return Promise.resolve();
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: REGISTER_FAIL,
      });

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });

      return Promise.reject(error.toString);
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      let message = {};
      message.text = error.toString();
      message.severity = 'error';

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
  return Promise.resolve();
};
