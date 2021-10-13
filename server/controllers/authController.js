const authService = require('../services/authService');

/**
 * Registers user by adding details to database and creates session
 * Returns userID, firstName and message
 */
exports.register = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await authService.register(firstName, lastName, email, password);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

/**
 * Logs user in through email and password and creates session
 * Returns userID, firstName and message
 */
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await authService.login(email, password);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.status).send(err);
  }
};

/**
 * Logs user out and destroys session
 * Returns a message
 */
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).send({ "message": "User not logged in" });
    }
    return res.status(200).send({ "message": "Logout Successful" });
  });
};
