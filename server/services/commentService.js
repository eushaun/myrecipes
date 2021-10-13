const commentRepository = require('../repositories/commentRepository');

exports.getComments = (uid, rid, offset, limit) => {
  return new Promise((resolve, reject) => {
    if (!rid || !uid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "RID or UID cannot be empty";
      return reject(err)
    }
    try {
      if (!offset) offset = 0;
      if (!limit) limit = 10;
      resolve(commentRepository.getComments(uid, rid, offset, limit));
    } catch (err) {
      return reject(err);
    }
  });
};

exports.createComment = (uid, rid, comment) => {
  return new Promise((resolve, reject) => {
    if (!uid || !rid || !comment) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or missing fields";
      return reject(err)
    }
    try {
      resolve(commentRepository.createComment(uid, rid, comment));
    } catch (err) {
      return reject(err);
    }
  });
};


exports.editComment = (cid, comment) => {
  return new Promise((resolve, reject) => {
    if (!cid || !comment) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or missing fields";
      return reject(err)
    }
    try {
      resolve(commentRepository.editComment(cid, comment));
    } catch (err) {
      return reject(err);
    }
  });
};

exports.deleteComment = (cid) => {
  return new Promise((resolve, reject) => {
    if (!cid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Cid cannot be empty";
      return reject(err)
    }
    try {
      resolve(commentRepository.deleteComment(cid));
    } catch (err) {
      return reject(err);
    }
  });
};

exports.flagComment = (cid, uid) => {
  return new Promise((resolve, reject) => {
    if (!cid || !uid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or missing fields";
      return reject(err)
    }
    try {
      resolve(commentRepository.flagComment(cid, uid));
    } catch (err) {
      return reject(err);
    }
  });
};

exports.unflagComment = (cid, uid) => {
  return new Promise((resolve, reject) => {
    if (!cid || !uid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or missing fields";
      return reject(err)
    }
    try {
      resolve(commentRepository.unflagComment(cid, uid));
    } catch (err) {
      return reject(err);
    }
  });
};
