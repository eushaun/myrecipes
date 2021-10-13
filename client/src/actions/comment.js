import {
  SET_MESSAGE,
} from "./types";

import CommentService from "../services/comment";

export const getComments = (body) => (dispatch) => {
  return CommentService.getComments(body).then(
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
      //   payload: '',
      // });

      return Promise.reject();
    }
  );
};

export const createComments = (comment) => (dispatch) => {
  return CommentService.createComment(comment).then(
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

export const editComment = (comment) => (dispatch) => {
  return CommentService.editComment(comment).then(
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

export const deleteComment = (cid) => (dispatch) => {
  return CommentService.deleteComment(cid).then(
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


export const flagComment = (comment) => (dispatch) => {
  return CommentService.flagComment(comment).then(
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

export const unflagComment = (cid, uid) => (dispatch) => {
  return CommentService.unflagComment(cid, uid).then(
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
