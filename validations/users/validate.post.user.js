const validator = require('validator');
const _ = require('lodash');
const { User } = require('../../models/User');

module.exports.validatePostUser = async (req, res, next) => {
  const { email, password, password2, fullName } = req.body;

  let errors = {};

  // email
  if (!email) {
    errors.email = "Email is required"
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid"
  } else {
    const user = await User.findOne({ email });
    if (user) errors.email = "Email exists";
  }

  // password
  if (!password) {
    errors.password = "Password is required"
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.password = "Password must have at least 6 characters"
  }

  // password 2
  if (!password2) {
    errors.password2 = "Confirmed password is required"
  } else if (!validator.equals(password, password2)) {
    errors.password2 = "Password must match"
  }

  if (!fullName) errors.fullName = "Full name is required"

  if (_.isEmpty(errors)) return next();
  return res.status(400).json(errors);
}