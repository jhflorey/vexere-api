const express = require('express');
const userController = require('./users');

const { authenticate, authorize } = require('../../../middlewares/auth');
const { uploadImage } = require('../../../middlewares/uploadImage');
const { validatePostUser } = require('../../../validations/users/validate.post.user');

const router = express.Router();

router.post(
  '/',
  validatePostUser,
  userController.createUser
)

router.post('/login', userController.login);

router.post(
  '/upload-avatar',
  authenticate,
  uploadImage("avatar"),
  userController.uploadAvatar)

// test private
router.get('/test-private',
  authenticate,
  authorize(["admin"]),
  (req, res, next) => {
    res.status(200).json({ message: "Ban da thay dieu ko nen thay" })
  })


module.exports = router;