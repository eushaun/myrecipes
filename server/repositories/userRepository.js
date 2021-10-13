const db = require('../db');
const argon2 = require('argon2');

/**
 * Gets logged in user's details
 * Returns userID, firstName, lastName, email, profilePic and bio
 */
exports.getOne = (uid, conid) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT DISTINCT u.uid, u.first_name, u.last_name, u.email, u.profile_pic, u.bio, (SELECT COUNT(*) FROM likes l, recipes r WHERE l.rid = r.rid AND r.uid = u.uid ) AS likes, (SELECT COUNT(*) FROM subscribers s WHERE s.conid = u.uid) AS subscribers, EXISTS (SELECT ss.subid FROM subscribers ss WHERE ss.subid = $1 AND ss.conid = $2) AS subscribed FROM users u WHERE u.uid = $2', [uid, conid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "User does not exist";
        return reject(err);
      }
      resolve({ "response": result['rows'][0] });
    });
  });
};

/**
 * Edits logged in user's details
 * Returns message
 */
exports.editUser = (uid, firstName, lastName, email, password, profilePic, bio) => {
  return new Promise((resolve, reject) => {
    if (password != 'undefined') {
      argon2.hash(password)
        .then(hashedPassword => {
          db.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, profile_pic = $5, bio = $6 WHERE uid = $7', [firstName, lastName, email, hashedPassword, profilePic, bio, uid], (err, result, _fields) => {
            if (err) {
              err.status = 500;
              return reject(err);
            }

            if (result['rowCount'] == 0) {
              let err = new Error(404);
              err.status = 404;
              err.response = "User does not exist";
              return reject(err);
            }
            resolve({ "response": "User details updated" });
          });
        })
        .catch((err) => {
          err.status = 500;
          return reject(err);
        });
    } else {
      db.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, profile_pic = $4, bio = $5 WHERE uid = $6', [firstName, lastName, email, profilePic, bio, uid], (err, result, _fields) => {
        if (err) {
          err.status = 500;
          return reject(err);
        }

        if (result['rowCount'] == 0) {
          let err = new Error(404);
          err.status = 404;
          err.response = "User does not exist";
          return reject(err);
        }
        resolve({ "response": "User details updated" });
      });
    }
  });
};

/**
 * Deletes logged in user
 * Returns message
 */
exports.deleteUser = (uid) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE uid = $1', [uid], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(404);
        err.status = 404;
        err.response = "User does not exist";
        return reject(err);
      }
      resolve({ "response": "User deleted" });
    });
  });
};

/**
 * Subscribe to contributor
 */
exports.subscribe = (subscriberId, contributorId) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO subscribers VALUES($1, $2)', [subscriberId, contributorId], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "User does not exist";
        return reject(err);
      }
      resolve({ "response": "Subscribed" });
    });
  });
};

/**
 * Unsubscribe to contributor
 */
exports.unsubscribe = (subscriberId, contributorId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM subscribers WHERE subid = $1 AND conid = $2', [subscriberId, contributorId], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }
      if (!result) {
        let err = new Error(404);
        err.status = 404;
        err.response = "User does not exist";
        return reject(err);
      }
      resolve({ "response": "Unsubscribed" });
    });
  });
};
