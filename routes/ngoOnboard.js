var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk');
var Ngo = require('../models/ngo');

var s3 = new aws.S3({signatureVersion: 'v4'});

var s3Sotrage = multerS3({
    s3: s3,
    bucket: 'engage-site-nns',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

var localStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

//var upload = multer({storage: s3Sotrage});
var upload = multer({storage: localStorage});

router.get('/ngo/onboard', function (req, res) {
    var host = '' + req.get('host');
    if (host.indexOf('ro') > -1) {
        res.render('ngo/onboarding');
    } else {
        res.render('ngo/onboarding');
    }

});

router.post('/ngo/onboard/section1', upload.array('file[]'), function (req, res) {

    console.log('Multer', req.files, req.body);

    for (var i = 0; i < req.files.length; i++) {
        if (req.files[i].originalname == req.body.addData.logo) {
            req.body.addData.logo = req.files[i].location
        } else if (req.files[i].originalname == req.body.addData.banner) {
            req.body.addData.banner = req.files[i].location
        }
    }

    if (typeof req.body.addData.sname != 'undefined') {
        req.body.addData.sname = req.body.addData.sname.toLowerCase().replace(/ /g, '-')
    }

    var newNgo = new Ngo(req.body.addData);
    newNgo.save(function (err, ngo) {
        if (err) res.status(500).json({"Error": err})
        else res.json(ngo)
    });

});

router.post('/ngo/onboard/section2', upload.any(), function (req, res) {

    console.log('Multer', req.files, req.body);
    var files = req.files;
    var data = req.body;
    for (var i = 0; i < files.length; i++) {
        for (var k = 0; k < data.length; k++) {
            console.log(i,k,files[i].originam)
            if (files[i].originalname == data[k].avatar) {
                data[k].avatar = files[i].path;
                //data[k].avatar = files[i].location;
            }
        }
    }

    console.log('Section 2 : Data : Post Conversion', data);
});

module.exports = router;
