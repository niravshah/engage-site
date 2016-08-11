var express = require('express');
var router = express.Router();
var uiError = require('../models/uierror');
router.post('/api/error', function (req, res) {
    var uE = new uiError({reason:req.body.exception.message,exception:req.body.exception.reason,date:new Date()});
    uE.save(function(error){
        if(error){
            console.log(error);
        }
        res.json({message:"Error Reported"})
    });

});

module.exports = router;