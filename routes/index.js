var express = require('express');
var router = express.Router();

var content = {};

content['en'] = {'s1.heading.1' : 'EMPLOYEE ENGAGEMENT'}
content['ro'] = {'s1.heading.1' : 'IMPLICAREA ANGAJAȚILOR'}

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res) {
  console.log("HOST:", req.get('host'));

  if(req.get('host').indexOf('ro')>-1){
    res.render('index', content['ro']);
  }else{
    res.render('index', content['en']);
  }

});


module.exports = router;
