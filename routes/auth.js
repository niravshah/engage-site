var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var generatePassword = require('password-generator');
var mailjet = require('./mailjet');
var User = require('../models/user');

module.exports = function (app) {
    router.post('/api/auth/register', function (req, res, next) {

        User.findOne({
            uname: req.body.uname
        }, function (err, user) {

            if (err){
                next(err);
            }

            if (user) {
                res.json({success: false, message: 'User already exists'});
            } else if (!user) {
                var newUser = new User({
                    uname: req.body.uname,
                    name: req.body.name,
                    orgId: [req.body.orgId],
                    role: 'admin'
                });

                if (typeof req.body.pword != 'undefined') {
                    newUser.pword = req.body.pword;
                } else {
                    newUser.pword = generatePassword();
                }

                newUser.save(function (err, savedUser) {
                    if (err) {
                        var newErr = new Error('Could not create new user');
                        newErr.err = err;
                        next(newErr);
                    } else {
                        mailjet.sendOnboardEmail(savedUser);
                        res.json({success: true, message: 'New User Created'});
                    }
                });
            }
        });
    });

    router.post('/api/auth/reset', function (req, res, next) {

        User.findOne({
            uname: req.body.uname
        }, function (err, user) {

            if (err){
                next(err)
            }

            if (!user) {
                res.json({success: false, message: 'User Not Found'});
            } else if (user) {

                if (user.pword != req.body.current) {
                    res.json({success: false, message: 'Current Password Invalid'});
                } else if (req.body.newP != req.body.newAgain) {
                    res.json({success: false, message: 'New Password does not match Retype New Password'});
                } else {
                    user.resetPassword = false;
                    user.pword = req.body.newP;
                    user.save(function (err, doc) {
                        if (err) {
                            res.json({success: false, message: 'Error Resetting Password. Please try again'});
                        } else {
                            res.json({success: true, message: 'Password Reset Successful'});
                        }
                    });
                }

            }
        });
    });

    router.post('/api/auth/login', function (req, res,next) {

        User.findOne({
            uname: req.body.uname
        }, function (err, user) {

            if (err){
                next(err)
            }

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (user.pword != req.body.pword) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    if (user.role != 'admin' && user.role != 'super') {
                        res.json({success: false, message: 'You are not authorized to sign in as admin'});
                    } else {
                        var token = jwt.sign(user, app.get('superSecret'), {expiresIn:"4h"});
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token,
                            sname: req.body.sname,
                            resetPassword: user.resetPassword
                        });
                    }
                }
            }
        });
    });

    return router;
};