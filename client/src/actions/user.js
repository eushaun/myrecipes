import {
  SET_MESSAGE,
} from "./types";

import UserService from "../services/user";

export const getUser = (body) => (dispatch) => {
  return UserService.getUser(body).then(
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

export const editUser = (user) => (dispatch) => {
  return UserService.editUser(user).then(
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

export const deleteUser = (uid) => (dispatch) => {
  return UserService.deleteUser(uid).then(
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


export const subscribe = (user) => (dispatch) => {
  return UserService.subscribe(user).then(
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


export const unsubscribe = (subid, conid) => (dispatch) => {
  return UserService.unsubscribe(subid, conid).then(
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
