const { User } = require('../../../models/User');
const bcrypt = require('bcryptjs');
const { promisify } = require('util'); // built-in nodejs
const jwt = require("jsonwebtoken");


const keys = require('../../../config/index');
console.log(keys.secret_key)
/**
 * @todo register new user
 */

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);

module.exports.createUser = (req, res, next) => {
  const { email, password, fullName } = req.body;
  const newUser = new User({
    email, password, fullName
  })

  newUser.save()
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err.status) return res.status(err.status).json({ message: err.message })
      return res.status(500).json(err)
    })
}

/**
 * @todo login with CREDENTIALS: email + password
 */
const comparePassword = promisify(bcrypt.compare)
const jwtSign = promisify(jwt.sign)
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "User not found" })

      return Promise.all([comparePassword(password, user.password), user])
    })
    .then(res => {
      const isMatch = res[0]
      const user = res[1]
      if (!isMatch) return Promise.reject({ status: 400, message: "Password is incorrect" })

      const payload = {
        email: user.email,
        userType: user.userType
      }
      return jwtSign(
        payload,
        keys.secret_key,
        { expiresIn: 3600 }
      )
    })
    .then(token => {
      return res.status(200).json({
        message: "Login successfully",
        token
      })
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json({ message: err.message })
      return res.status(500).json(err)
    })
}

module.exports.uploadAvatar = (req, res, next) => {
  const { email } = req.user;
  User.findOne({ email: email })
    .then(user => {
      user.avatar = req.file.path;
      return user.save()
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.json(err))
}