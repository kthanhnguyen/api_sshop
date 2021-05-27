const multer = require("multer");
fs = require('fs-extra');
const maxSize = 2 * 1024 * 1024;
const baseUrl = "http://localhost:5000/files/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir('./uploads/',(err) => {
      cb(null, './uploads/');
   });
  },
  filename: function (req, file, cb) {
    const mineType = file.mimetype.replace("image/", "");
    cb(null, `${file.fieldname}-${Date.now()}.${mineType}`)
  }
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }
})

module.exports = uploadFile;