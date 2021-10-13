const db = require('../db');

/**
 */
exports.getComments = (uid, rid, offset, limit) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT c.cid, c.comment, c.cdate, c.ctime, u.first_name, u.last_name, u.profile_pic, u.uid, EXISTS (SELECT f.cid FROM flagged_comments f WHERE f.cid = c.cid AND f.uid = $1 ) AS flagged FROM comments c INNER JOIN users u ON c.uid = u.uid INNER JOIN recipes r ON c.rid = r.rid WHERE r.rid = $2', [uid, rid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "No comments found";
        return reject(err);
      }
      resolve({ "response": result['rows'] });
    });
  });
};

/**

 */
exports.createComment = (uid, rid, comment) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO comments(uid, rid, comment) VALUES($1, $2, $3)', [uid, rid, comment], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Recipe does not exist";
        return reject(err);
      }
      resolve({ "response": "Comment created" });
    });
  });
};

/**
 *
 */
exports.editComment = (cid, comment) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE comments SET comment = $1 WHERE cid = $2', [comment, cid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Comment does not exist";
        return reject(err);
      }
      resolve({ "response": "Comment updated" });
    });
  });
};

/**
 *
 */
exports.deleteComment = (cid) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM comments WHERE cid = $1', [cid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Comment does not exist";
        return reject(err);
      }
      resolve({ "response": "Comment Deleted" });
    });
  });
};

exports.flagComment = (cid, uid) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO flagged_comments VALUES ($1, $2)', [cid, uid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Comment or user does not exist";
        return reject(err);
      }
      resolve({ "response": "Comment Flagged" });
    });
  });
};


exports.unflagComment = (cid, uid) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM flagged_comments WHERE cid = $1 AND uid = $2', [cid, uid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "Comment or user does not exist";
        return reject(err);
      }
      resolve({ "response": "Comment Unflagged" });
    });
  });
};
