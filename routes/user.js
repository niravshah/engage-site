var express = require('express');
var router = express.Router();
var Ngo = require('../models/ngo');
var User = require('../models/user');

router.get('/user/:id/ngos', function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
        if (err) {
            res.status(500).json({success: false, message: "Error retrieving user data"})
        } else {

            if (user.role == 'super') {
                Ngo.find({}, function (err, ngos) {
                    if (err) {
                        res.status(500).json({success: false, message: "Error retrieving Ngoss"})
                    } else {
                        res.status(200).json({success: true, ngos: ngos})
                    }
                });

            } else {

                var snames = user.orgId;
                if (snames) {
                    Ngo.find({sname: {$in: snames}, status: 'active'}, function (err, ngos) {
                        if (err) {
                            res.status(500).json({success: false, message: "Error retrieving user data"})
                        } else {
                            res.status(200).json({success: true, ngos: ngos})
                        }
                    });
                }
            }
        }
    });
});

module.exports = router;