var express = require('express');
var router = express.Router();

var content = {};
content['en'] = {
    "s1_1":"Join Engage",
    "s1_2":"Lets us help you make difference."
};
content['ro'] = {};

router.get('/ngo', function (req, res) {
    var host = '' + req.get('host');
    if (host.indexOf('ro') > -1) {
        res.render('ngo/landing', content['ro']);
    } else {
        res.render('ngo/landing', content['en']);
    }

});

router.get('/ngo/onboard', function (req, res) {
    var host = '' + req.get('host');
    if (host.indexOf('ro') > -1) {
        res.render('ngo/onboarding', content['ro']);
    } else {
        res.render('ngo/onboarding', content['en']);
    }

});


module.exports = router;
