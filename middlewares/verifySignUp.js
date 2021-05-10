const Users = require('../models/user.model');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (req.Users) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;