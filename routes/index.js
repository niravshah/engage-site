var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  console.log("HOST:", req.get('host'));
  res.render('index', { title: 'Express' });
});


module.exports = router;
