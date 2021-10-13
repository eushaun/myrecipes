const db = require('../db');
const argon2 = require('argon2');

exports.checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT uid FROM users WHERE email = $1', [email], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] > 0) {
        let err = new Error(409);
        err.status = 400;
        err.response = "User already exists";
        return reject(err);
      }
      resolve();
    });
  });
};

exports.register = (firstName, lastName, email, password) => {
  return new Promise((resolve, reject) => {
    argon2.hash(password)
      .then(hashedPassword => {
        db.query('INSERT INTO users(first_name, last_name, email, password, profile_pic, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING uid, first_name, profile_pic', [firstName, lastName, email, hashedPassword, '', ''], (err, result, _fields) => {
          if (err) {
            err.status = 500;
            return reject(err);
          }

          if (result) {
            let res = {};
            res.uid = result['rows'][0]['uid'];
            res.firstName = result['rows'][0]['first_name'];
            res.profilePic = result['rows'][0]['profile_pic'];
            resolve({ "response": res});
          }
        });
      })
      .catch((err) => {
        err.status = 500;
        return reject(err);
      });
  });
};

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT uid, password, first_name, profile_pic FROM users WHERE email = $1', [email], (err, result, _fields) => {
      if (err) {
        err.status = 500;
        return reject(err);
      }

      if (result['rowCount'] == 0) {
        let err = new Error(409);
        err.status = 409;
        err.response = "Incorrect Email or Password";
        return reject(err);
      }

      const hashedPassword = result['rows'][0]['password'];

      argon2.verify(hashedPassword, password)
        .then(match => {
          if (match) {
            let res = {};
            res.uid = result['rows'][0]['uid'];
            res.firstName = result['rows'][0]['first_name'];
            res.profilePic = result['rows'][0]['profile_pic'];
            resolve({ "response": res});
          } else {
            let err = new Error(409);
            err.status = 409;
            err.response = "Incorrect Email or Password";
            return reject(err);
          }
        }).catch(err => {
          err.status = 500;
          return reject(err);
        });
    });
  });
};
