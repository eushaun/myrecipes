const authRepository = require('../repositories/authRepository');

exports.register = (firstName, lastName, email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!firstName || !lastName || !email || !password) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or more fields missing";
      return reject(err)
    }
    try {
      await authRepository.checkEmail(email);
      const uid = await authRepository.register(firstName, lastName, email, password);
      resolve(uid);
    } catch (err) {
      return reject(err);
    }
  });
};

exports.login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password) {
      let err = new Error(400);
      err.status = 400;
      err.response = "Email and password required";
      return reject(err)
    }
    try {
      const uid = await authRepository.login(email, password);
      resolve(uid);
    } catch (err) {
      return reject(err);
    }
  });
};
