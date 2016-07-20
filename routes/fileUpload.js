var express = require('express');
var router = express.Router();
var multer  = require('multer');
var Ngo = require('../models/ngo');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-'+ file.originalname)
  }
})

var upload = multer({ storage: storage });

router.post('/photos/upload', upload.array('file[]'), function (req, res, next) {
    
    console.log('Multer', req.files, req.body);
    
    for(i=0;i<req.files.length;i++){
        if(req.files[i].originalname == req.body.addData.logo){
            req.body.addData.logo = req.files[i].path
        }else if(req.files[i].originalname == req.body.addData.banner){
            req.body.addData.banner = req.files[i].path
        }        
    }
    
    req.body.addData.sname = req.body.addData.sname.toLowerCase().replace(/ /g, '-')
    
    var newNgo = new Ngo(req.body.addData);
    newNgo.save(function(err,ngo){
        if(err) res.status(500).json({"Error": err})
        else res.json(ngo)
    });

});

module.exports = router;