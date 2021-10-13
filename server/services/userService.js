const userRepository = require('../repositories/userRepository');

exports.getOne = (uid, conid) => {
  return new Promise((resolve, reject) => {
    if (!uid || !conid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "UID or ConID cannot be empty";
      return reject(err);
    }
    try {
      resolve(userRepository.getOne(uid, conid));
    } catch (err) {
      return reject(err);
    }
  });
};

exports.editUser = (uid, firstName, lastName, email, password, profilePic, bio) => {
  return new Promise((resolve, reject) => {
    if (!uid || !firstName || !lastName || !email || (!profilePic && profilePic != '') || (!bio && bio != '')) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or missing fields";
      return reject(err);
    }

    if (profilePic) {
      if (!profilePic.startsWith('https')) {
        profilePic = `https://myrecipes-images.s3.us-east-2.amazonaws.com/profile/${profilePic}`;
      }
    }

    try {
      resolve(userRepository.editUser(uid, firstName, lastName, email, password, profilePic, bio));
    } catch (err) {
      return reject(err);
    }
  });
};


exports.deleteUser = (uid) => {
  return new Promise((resolve, reject) => {
    if (!uid) {
      let err = new Error(400);
      err.status = 400;
      err.response = "UID cannot be empty";
      return reject(err);
    }
    try {
      resolve(userRepository.deleteUser(uid));
    } catch (err) {
      return reject(err);
    }
  });
};

exports.subscribe = (subscriberId, contributorId) => {
  return new Promise(async (resolve, reject) => {
    if (!subscriberId || !contributorId) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or more missing fields";
      return reject(err)
    }
    if (subscriberId == contributorId) {
      let err = new Error(409);
      err.status = 409;
      err.response = "You cannot subscribe to yourself";
      return reject(err);
    }
    try {
      await userRepository.getOne(contributorId, contributorId);
      const res = await userRepository.subscribe(subscriberId, contributorId);
      resolve(res);
    } catch (err) {
      return reject(err);
    }
  });
};

exports.unsubscribe = (subscriberId, contributorId) => {
  return new Promise(async (resolve, reject) => {
    if (!subscriberId || !contributorId) {
      let err = new Error(400);
      err.status = 400;
      err.response = "One or missing fields";
      return reject(err);
    }
    try {
      await userRepository.getOne(contributorId, contributorId);
      resolve(await userRepository.unsubscribe(subscriberId, contributorId));
    } catch (err) {
      return reject(err);
    }
  });
};

