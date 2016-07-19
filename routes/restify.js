var express = require('express');
var router = express.Router();
var restify = require('express-restify-mongoose');

var ngo = require('../models/ngo');

restify.serve(router, ngo);


for (i = 0; i < router.stack.length; i++) {
    var route = router.stack[i].route;
    if (typeof route != 'undefined') {
        console.log(route.path)
        for (key in route.methods) {
            console.log(key)
        }
    }
} 

module.exports = router;


