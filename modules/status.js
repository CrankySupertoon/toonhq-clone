// Server Status -- ToonHQ Clone
// Created by @gaarb

// Modules

var request = require('request');
var ping = require('net-ping');
var dns = require('dns');

// Setups

var session = ping.createSession();

// Variables

var LoginURL = "https://www.toontownrewritten.com/api/login?format=json"; // Login API link.
var Username = ""; // Username for Login API.
var Password = ""; // Password for Login API.

var Response; // Response which is stored in array so we can decode it.
var QueueToken = ""; // String variable for when you're returned with a queue token.
var Gameserver = ""; // The IP of the server which will be pinged.

var GameIP; // Storing the Gameserver IP. This is left blank because the API will *possibly* return something new each time.
var LoginIP = "www.toontownrewritten.com"; // Storing the Login IP.

var GameserverStatus; // Boolean which determines the status of the Gameserver.
var LoginServerStatus; // Boolean which determines the status of the LoginServer.

// Router Functions

module.exports = {
  returnServerStatus: function (req, res) {
    captureLoginData();
    setTimeout(function () {
      lookupGameIP(Gameserver);
      lookupLoginIP(LoginIP);
    }, 4000);
    setTimeout(function () {
      checkServers();
    }, 5000);
    setTimeout(function () {
      res.send({ 'gameserver': GameserverStatus, 'login': LoginServerStatus }); // This will be lowered in production. It's only high because of my delay.
    }, 5000);
  }
};

// Normal Functions

function captureLoginData () {
  request.post({
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    url: LoginURL,
    body: "username="+ Username +"&password="+ Password +""
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      Response = JSON.parse(body);
      if (Response['success'] == false) {
        console.log(Response['banner']);
        return
      }
      if (Response['success'] == "delayed") {
        QueueToken = Response['queueToken'];
        return queuedTokenResponse(QueueToken)
      } else {
        Gameserver = Response['gameserver'];
      }
    }
  });
}

function queuedTokenResponse(QueueToken) {
  request.post({
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    url: LoginURL,
    body: "queueToken="+ QueueToken +""
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      Response = JSON.parse(body);
      Gameserver = Response['gameserver'];
    }
  });
}

function lookupGameIP(domain) {
  dns.lookup(domain, (err, address, family) => {
    GameIP = address;
  });
}

function lookupLoginIP(domain) {
  dns.lookup(domain, (err, address, family) => {
    LoginIP = address;
  });
}

function checkServers () {
  session.pingHost(GameIP, function (error, target) {
    if (!error) {
      GameserverStatus = true;
    } else {
      GameserverStatus = false;
    }
  });
  // Ping the Login Server
  session.pingHost(LoginIP, function (error, target) {
    if (!error) {
      LoginServerStatus = true;
    } else {
      LoginServerStatus = false;
    }
  });
}

// Finalise

console.log('[Status] No errors are detected. Continuing...');
