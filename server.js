
// Set Dev as the default config unless told otherwise by command line arguments
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    router = express.Router(),
    swig = require('swig'),
    config = require('./config/config'),
    LRU = require('lru-cache');


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


// Set up info cache

global.infoCache = LRU(100);


// Set up routes

router.use(logger(':remote-addr :method :url'));
require('./app/routes/home.js')(router);
require('./app/routes/info.js')(router);


// Set up Swig

swig.setDefaults({ cache: false });

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');


// Set up middleware

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
