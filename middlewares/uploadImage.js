const multer = require('multer');
const mkdirp = require('mkdirp');

// ./uploads/avatar
// ./uploads/trip
// ./uploads/coach 

module.exports.uploadImage = (type) => {
  mkdirp(`./uploads/${type}`, (err) => {
    if (err) return console.log(err);
  })

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${type}`)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
    }
  })

  const upload = multer({ storage })
  return upload.single(type)
}
