var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk');
var Ngo = require('../models/ngo');

var s3 = new aws.S3({signatureVersion: 'v4'});
aws.config.region = 'eu-central-1';
//aws.config.update({accessKeyId: 'AKIAJ4D2THKELCUJJEHQ', secretAccessKey: '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'});

var storage = multerS3({
    s3: s3,
    bucket: 'engage-site-nns',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        //cb(null, Date.now().toString())
        cb(null, Date.now() + '-'+ file.originalname);
    }
});

/*var storage = multer.diskStorage({
 destination: function (req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function (req, file, cb) {
 cb(null, Date.now() + '-'+ file.originalname)
 }
 });*/

var upload = multer({storage: storage});

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
        console.log('For Loop', req.files[i].originalname, req.body.addData.logo)
        if (req.files[i].originalname == req.body.addData.logo) {
            req.body.addData.logo = req.files[i].location
        } else if (req.files[i].originalname == req.body.addData.banner) {
            req.body.addData.banner = req.files[i].location
        }
    }

    req.body.addData.sname = req.body.addData.sname.toLowerCase().replace(/ /g, '-')

    var newNgo = new Ngo(req.body.addData);
    newNgo.save(function (err, ngo) {
        if (err) res.status(500).json({"Error": err})
        else res.json(ngo)
    });

});


module.exports = router;
