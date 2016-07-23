var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk');
var Ngo = require('../models/ngo');
var sid = require('shortid');

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

router.post('/ngo', upload.any(), function (req, res) {

    //console.log('Multer', req.files, req.body);

    for (var i = 0; i < req.files.length; i++) {
        console.log(i, req.files[i].originalname, req.body.addData.logo, req.body.addData.banner, req.files[i].path)
        if (req.files[i].originalname == req.body.addData.logo) {
            //req.body.addData.logo = req.files[i].location
            req.body.addData.logo = '/' + req.files[i].path
        } else if (req.files[i].originalname == req.body.addData.banner) {
            //req.body.addData.banner = req.files[i].location
            req.body.addData.banner = '/' + req.files[i].path
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

router.post('/ngo/:id/members', upload.any(), function (req, res) {

    var files = req.files;
    var data = req.body.addData;
    var id = req.params.id;

    //console.log(files,data, id);

    data.id = sid.generate();

    for (var i = 0; i < files.length; i++) {
        console.log(files[i].originalname,data.avatar);
        if (files[i].originalname == data.avatar) {
            data.avatar = '/' + files[i].path;
            //data.avatar = files[i].location;
        }
    }

    Ngo.findOne({_id: id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        } else {
            var origSize = ngo.teamMembers.length - 1;
            ngo.teamMembers.push(data)
            ngo.save(function (err, ngo) {
                if (err) {
                    res.status(500).json({'Error': err});
                }
                else {
                    res.json(ngo.teamMembers[origSize+1]);
                }
            })
        }
    });

});

router.delete('/ngo/:id/members/:mid',function(req,res){

    var id = req.params.id;
    var mid = req.params.mid;
    Ngo.findOne({_id: id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        } else {
            var spliceIndex=-1;
            for(var i =0; i<ngo.teamMembers.length; i++){
                if(ngo.teamMembers[i].id == mid){
                    spliceIndex = i;
                }
            }
            if(spliceIndex >-1){
                ngo.teamMembers.splice(spliceIndex,1)
            }

            console.log('Updated Ngo', ngo);
            ngo.save(function (err, ngo) {
                if (err) {
                    res.status(500).json({'Error': err});
                }
                else {
                    res.json(ngo);
                }
            })
        }
    });
});

router.post('/ngo/:id/projects', upload.any(), function (req, res) {

    var files = req.files;
    var data = req.body.addData;
    var id = req.params.id;

    //console.log(files,data, id);

    data.id = sid.generate();

    for (var i = 0; i < files.length; i++) {
        console.log(files[i].originalname,data.avatar);
        if (files[i].originalname == data.banner) {
            data.banner = '/'+files[i].path;
            //data.banner = files[i].location;
        }
    }

    Ngo.findOne({_id: id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        } else {
            var origSize = ngo.projects.length - 1;
            ngo.projects.push(data)
            ngo.save(function (err, ngo) {
                if (err) {
                    res.status(500).json({'Error': err});
                }
                else {
                    res.json(ngo.projects[origSize+1]);
                }
            })
        }
    });

});

router.delete('/ngo/:id/projects/:mid',function(req,res){

    var id = req.params.id;
    var mid = req.params.mid;

    Ngo.findOne({_id: id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        } else {
            var spliceIndex=-1;
            for(var i =0; i<ngo.projects.length; i++){
                if(ngo.projects[i].id == mid){
                    spliceIndex = i;
                }
            }
            if(spliceIndex >-1){
                ngo.projects.splice(spliceIndex,1)
            }

            //console.log('Updated Ngo', ngo);
            ngo.save(function (err, ngo) {
                if (err) {
                    res.status(500).json({'Error': err});
                }
                else {
                    res.json(ngo);
                }
            })
        }
    });
});

module.exports = router;
