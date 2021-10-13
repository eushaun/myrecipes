import axios from "axios";

const getComments = async (body) => {
  try {
    const res = await axios.get('http://localhost:3000/comment', { params: body });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
};

const createComment = async (comment) => {
  try {
    const res = await axios.post('http://localhost:3000/comment', comment);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
};


const editComment = async (comment) => {
  try {
    const res = await axios.put('http://localhost:3000/comment', comment);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
};

const deleteComment = async (cid) => {
  try {
    const res = await axios.delete(`http://localhost:3000/comment/${cid}`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
};

const flagComment = async (comment) => {
  try {
    const res = await axios.post('http://localhost:3000/comment/flag', comment);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
};

const unflagComment = async (cid, uid) => {
  try {
    const res = await axios.delete(`http://localhost:3000/comment/unflag/${cid}/${uid}`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response.data.response);
  }
};



// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getComments,
  createComment,
  editComment,
  deleteComment,
  flagComment,
  unflagComment
};
