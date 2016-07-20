var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    console.log('Multer', req.files)
});

module.exports = router;