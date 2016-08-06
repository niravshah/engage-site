var express = require('express');
var router = express.Router();
var Ngo = require('../models/ngo');

var content = {};
content['en'] = {
    "s1_1": "Join Engage",
    "s1_2": "Let us help you change the world."
};
content['ro'] = {};

router.get('/ngo', function (req, res) {
    var host = '' + req.get('host');
    if (host.indexOf('ro') > -1) {
        res.render('ngo/join', content['ro']);
    } else {
        res.render('ngo/join', content['en']);
    }
});

router.get('/ngo/admin',function (req,res){
   res.render('ngo/admin');
});

router.get('/ngo/:id', function (req, res, next) {
    Ngo.findOne({sname: req.params.id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        }
        else if (ngo) {
            console.log(ngo);
            res.render('ngo/landing', ngo);
        } else {
            next();
        }
    });

});
router.get('/ngo/:id/:pid', function (req, res, next) {
    Ngo.findOne({sname: req.params.id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        }
        else if (ngo) {

            var currentProject;
            for(var i=0;i<ngo.projects.length;i++){
                if(ngo.projects[i].id == req.params.pid){
                    currentProject = ngo.projects[i];
                }
            }

            ngo.project = currentProject;
            res.render('ngo/project', ngo);
        } else {
            next();
        }
    });

});

router.get('/ngo/:id/login', function (req, res, next) {

    Ngo.findOne({'sname': req.params.id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        }
        else if (ngo) {
            console.log(ngo)
            res.render('ngo/login', ngo);
        } else {
            next();
        }
    });

});

router.get('/ngo/sname/:id',function(req,res){

    Ngo.findOne({sname: req.params.id, status:'active'}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        }
        else if (ngo) {
            res.json(ngo);
        }
    });
});

module.exports = router;