var express = require('express');
var router = express.Router();
var Ngo = require('../models/ngo');

var content = {};
content['en'] = {
    "s1_1":"Join Engage",
    "s1_2":"Let us help you change the world."
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

router.get('/ngo/:id',function(req,res){
    console.log(req.params.id)
    Ngo.findOne({'sname':req.params.id},function(err,ngo){
        if(err){
            res.status(500).json({'Error':err});
        }else{
            res.json(ngo);
        }
    })
});

module.exports = router;