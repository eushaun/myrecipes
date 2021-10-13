const userService = require('../services/userService');

/**
 * Gets logged in user's details
 * Returns userID, firstName, lastName, email, profilePic and bio
 */
exports.getOne = async (req, res) => {
  const uid = req.query.uid;
  const conid = req.query.conid;

  try {
    const result = await userService.getOne(uid, conid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

/**
 * Edits logged in user's details
 * Returns message
 */
exports.editUser = async (req, res) => {
  // if (!req.session.id) {
  //   return res.status(401).send({ "message": "Not logged in" });
  // }

  const uid = req.body.uid;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const profilePic = req.body.profilePic;
  const bio = req.body.bio;

  try {
    const result = await userService.editUser(uid, firstName, lastName, email, password, profilePic, bio);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }

};

/**
 * Deletes logged in user
 * Returns message
 */
exports.deleteUser = async (req, res) => {
  // if (!req.session.id) {
  //   return res.status(401).send({ "message": "Not logged in" });
  // }

  const uid = req.params.uid;

  try {
    const result = await userService.deleteUser(uid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

/**
 * Subscribe to contributor
 */
exports.subscribe = async (req, res) => {
  // if (!req.session.id) {
  //   return res.status(401).send({ "message": "Not logged in" });
  // }

  const subid = req.body.subid;
  const conid = req.body.conid;


  try {
    const result = await userService.subscribe(subid, conid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

/**
 * Unsubscribe to contributor
 */
exports.unsubscribe = async (req, res) => {
  // if (!req.session.id) {
  //   return res.status(401).send({ "message": "Not logged in" });
  // }

  const subid = req.params.subid;
  const conid = req.params.conid;

  try {
    const result = await userService.unsubscribe(subid, conid);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};
