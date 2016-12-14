// Main Express Router -- ToonHQ Clone
// Created by @gaarb

// Modules

var express = require('express');
var app = express();
var bp = require('body-parser');
var morgan = require('morgan');

var Invasion = require('./modules/invasions');
var Status = require('./modules/status');

// Configuration

var feVal = "::1"; // IP of the front-end so it doesn't get logged in console.

var port = process.env.PORT || 8080; // Designating the port.
var router = express.Router(); // Allowing us to create our routes.

app.use('/api/v1/', router); // Registering the routes.

app.use(morgan('dev'));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

// Middleware -- This is used so when we know if an infected connection is incoming.

router.use(function(req, res, next){
  if (req.connection.remoteAddress == feVal) {
    next();
  } else  {
    console.log('[Middleware] There is an incoming connection coming from: ' + req.connection.remoteAddress + '.');
    next();
  }
});

// Routers

router.get('/', function(req, res) {
  res.json(
    { message: "Welcome to ToonHQ Clone API!" }
  );
});

router.get('/invasions', Invasion.sendInvasionList);

router.get('/status', Status.grabServerStatus);

// Finalise

app.listen(port);
console.log('[Server] Web-server has successfully started!');
