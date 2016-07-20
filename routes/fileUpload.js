var express = require('express');
var router = express.Router();
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-'+ file.originalname)
  }
})

var upload = multer({ storage: storage });

router.post('/photos/upload', upload.array('file[]'), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    console.log('Multer', req.files, req.file, req.body)
});

module.exports = router;