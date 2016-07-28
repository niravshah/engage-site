var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];
console.log("ENV:", env);

var express = require('express');
var app = express();
app.set("superSecret",config.superSecret);
var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);

var me_config = require('./me_config')[env];
var mongo_express = require('mongo-express/lib/middleware');
app.use('/mongo_express', mongo_express(me_config.mongo_express_config))

var logger = require('morgan');
app.use(logger('dev'));

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

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

app.use(function(req,res,next){
  console.log(req.file, req.body);
  next();
});

var index = require('./routes/index');
var auth = require('./routes/auth')(app);
var mailjet = require('./routes/mailjet');
var ngo = require('./routes/ngo');
var ngoOnboard = require('./routes/ngoOnboard');

app.use(auth);
app.use(index);
app.use(ngoOnboard);
app.use(ngo);
app.use(mailjet);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render(404);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('Error!', err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(9000, function() {
  console.log('Example app listening on port 9000!');
});
