const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

var storage = multer.diskStorage({
  destination: "public/upload/",
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(
        null,
        Math.floor(Math.random() * 9000000000) +
          1000000000 +
          path.extname(file.originalname)
      );
    });
  },
});
var upload = multer({ storage: storage });

module.exports = upload;
