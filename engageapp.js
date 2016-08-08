var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];
console.log("ENV:", env);

var express = require('express');
var app = express();
app.set("superSecret", config.superSecret);
var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);

var me_config = require('./me_config')[env];
var mongo_express = require('mongo-express/lib/middleware');
app.use('/mongo_express', mongo_express(me_config.mongo_express_config))

var logger = require('morgan');
app.use(logger('dev'));

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/angular', express.static(path.join(__dirname, 'angular')));

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public/images/favicons', 'favicon.ico')));

var swig = require('swig');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
swig.setDefaults({
    cache: false
});

var winston = require('winston');
require('winston-mongodb').MongoDB;
require('winston-daily-rotate-file')

var winston = new (winston.Logger)({
    transports: [
        new (winston.transports.DailyRotateFile )({
            name: 'info-file',
            filename: 'info.log',
            level: 'info'
        }),
        new (winston.transports.MongoDB)({
            db: config.mongoUrl,
            collection:'error_logs',
            level: 'error'
        })
    ]
}); 

var index = require('./routes/index');
var auth = require('./routes/auth')(app);
var ngo = require('./routes/ngo');
var ngoOnboard = require('./routes/ngoOnboard');
var user = require('./routes/user');

app.use(auth);
app.use(index);
app.use(ngoOnboard);
app.use(ngo);
app.use(user);

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404).render(404);
});

// error handlers
// development error handler
// will print stacktrace
if (env === 'dev') {
    app.use(function (err, req, res) {
        winston.log('error','Global Error Handler',{error: err});
        console.log('Global Error Handler',err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}else {
// production error handler
// no stack traces leaked to user
    app.use(function (err, req, res) {
        winston.log('error','Global Error Handler',{error: err});
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

app.listen(9000, function () {
    console.log('Engage App listening on port 9000!');
});
