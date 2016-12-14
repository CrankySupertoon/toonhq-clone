// Main Express Router -- ToonHQ Clone
// Created by @gaarb

// Modules

var express = require('express');
var app = express();
var bp = require('body-parser');
var morgan = require('morgan');

var Invasion = require('./modules/invasions');

// Configuration

var port = process.env.PORT || 8080; // Designating the port.
var router = express.Router(); // Allowing us to create our routes.

app.use('/api/v1/', router); // Registering the routes.

app.use(morgan('dev'));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

// Middleware -- This is used so when we know if an infected connection is incoming.

router.use(function(req, res, next){
  // Advanced logging feature.
  console.log('[Middleware] There is an incoming connection coming from: ' + req.connection + '.');
  next();
});

// Routers

router.get('/', function(req, res) {
  res.json(
    { message: "Welcome to ToonHQ Clone API!" }
  );
});

router.get('/invasions', function(req, res) {
  Invasion.grabInvasionList(req, res);
})

// Finalise

app.listen(port);
console.log('[Server.js] Web-server has successfully started!');
