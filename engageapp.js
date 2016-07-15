var express = require('express');
var app = express();

var logger = require('morgan');
app.use(logger('dev'));

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

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
  next();
});

var routes = require('./routes/index');
var mailjet = require('./routes/mailjet')
var ngoLanding = require('./routes/ngo-landing')
app.use('/', routes);
app.use('/', ngoLanding);
app.use('/',mailjet);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
