var express = require('express');
var router = express.Router();

var content = {};

content['en'] = {s1_heading_1 : 'EMPLOYEE ENGAGEMENT'}
content['ro'] = {s1_heading_1 : 'IMPLICAREA ANGAJAȚILOR'}

router.get('/', function(req, res) {
  res.redirect('/home')
});

router.get('/home', function(req, res) {
  var host = '' + req.get('host');
  if(host.indexOf('ro') > -1){
    res.render('index', content['ro']);
  }else{
    res.render('index', content['en']);
  }

});


module.exports = router;
