var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = function (app) {
    router.post('/auth/register', function (req, res, next) {

        User.findOne({
            uname: req.body.uname
        }, function (err, user) {

            if (err) throw err;

            if (user) {
                res.json({success: false, message: 'User already exists'});
            } else if (!user) {

                var newUser = new User({uname: req.body.uname, pword: req.body.pword, orgId: req.body.orgId});
                newUser.save(function (err, savedUser) {
                    if (err) {
                        var newErr = new Error('Could not create new user');
                        newErr.err = err;
                        next(newErr);
                    } else {
                        res.json({success: true, user: savedUser});
                    }
                });
            }
        });
    });


    router.post('/auth/login', function (req, res) {

        User.findOne({
            uname: req.body.uname
        }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (user.pword != req.body.pword) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    if (user.orgId != req.body.sname) {

                        res.json({success: false, message: 'You dont have access to this Organization'});

                    } else {
                        var token = jwt.sign(user, app.get('superSecret'), {});

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });

                    }

                }

            }

        });
    });

    return router;
};