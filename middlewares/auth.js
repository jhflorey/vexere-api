const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require("../config");

const verifyJwt = promisify(jwt.verify)
module.exports.authenticate = (req, res, next) => {
  const token = req.header("token");

  verifyJwt(token, config.secret_key)
    .then((decoded) => {
      if (decoded) {
        req.user = decoded;
        return next();
      }
    })
    .catch(() => res.status(401).json({ message: "User is not authentecated" }))
}

// userTypeArray = ["admin", "client"]
// 1. "admin" --> "admin" = user.userType ==> next()
// 2. "client" --> "client" = user.userType = Next()
module.exports.authorize = (userTypeArray) => {
  return (req, res, next) => {
    const { user } = req;

    if (userTypeArray.findIndex(elm => elm === user.userType) > -1) return next();
    // if (userType === user.userType) return next();
    return res.status(403).json({
      message: "Ban da dang nhap, nhung ko co quyen xem"
    })
  }
}