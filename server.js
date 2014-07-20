
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var router = express.Router();
var swig = require('swig');

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}




// Setup routes

router.use(logger());
require('./app/routes/home.js')(app);


// Setup Swig

swig.setDefaults({ cache: false });

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

// Setup middleware

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride());

app.use('/', router);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


// Run server

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
