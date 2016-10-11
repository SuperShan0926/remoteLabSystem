var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs')); // adds Async() versions that return promises
var crypto = require('crypto');


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var angal = require('./routes/angal');
var users = require('./routes/users');
var session       = require('express-session');
var flash         = require('connect-flash');

httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({auth:"admin:"});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'sb-admin-react/build')));
// app.use(express.static(path.join(__dirname, 'nowa/dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bundle')));
app.use(express.static(path.join(__dirname, 'LoginForm')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//user management middleware need session & flash
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

app.use(flash());
app.use('/', routes);
app.use('/angal', angal);
app.use('/user', users);

//数据库
// var nedb = require('nedb');
var DB=require('./db');

var expressRestResource = require('express-rest-resource');
app.use('/api/exp', expressRestResource({ db: DB.exp }));
app.use('/api/course', expressRestResource({ db: DB.course }));
app.use('/api/expDesc', expressRestResource({ db: DB.expDesc }));
app.use('/api/desk', expressRestResource({ db: DB.desk }));
app.use('/api/device', expressRestResource({ db: DB.device }));
app.use('/api/config', expressRestResource({ db: DB.config }));
app.use('/api/timeslot', expressRestResource({ db: DB.timeslot }));

// app.use(function(req, res) {
//   // You can define here your custom logic to handle the request
//   // and then proxy the request.
//   proxy.web(req, res, { target: 'http://192.168.3.110:81' });
// })

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
