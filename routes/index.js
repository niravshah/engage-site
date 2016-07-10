var express = require('express');
var router = express.Router();

var content = {};

content['en'] = {head : 'EMPLOYEE ENGAGEMENT'}
content['ro'] = {head : 'IMPLICAREA ANGAJAȚILOR'}

router.get('/', function(req, res) {
  if(host.indexOf('ro') > -1){
    res.render('index', content['ro']);
  }else{
    res.render('index', content['en']);
  }

});

router.get('/home', function(req, res) {
  var host = '' + req.get('host');
  console.log("HOST:", host);
  console.log("Index:", host.indexOf('ro'));
  if(host.indexOf('ro') > -1){
    res.render('index', content['ro']);
  }else{
    console.log(content['en'])
    res.render('index', content['en']);
  }

});


module.exports = router;
