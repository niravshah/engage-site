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
        res.render('ngo/home', content['ro']);
    } else {
        res.render('ngo/home', content['en']);
    }
});

router.get('/ngo/:id', function (req, res) {

    Ngo.findOne({'sname': req.params.id}, function (err, ngo) {
        if (err) {
            res.status(500).json({'Error': err});
        }
        res.render('ngo/landing', ngo);
    });
});

module.exports = router;