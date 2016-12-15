// Server Status -- ToonHQ Clone
// Created by @gaarb

// Modules

var request = require('request');

// Variables

var LoginURL = "https://www.toontownrewritten.com/api/login?format=json"; // Login API link.
var Username = ""; // Username for Login API.
var Password = ""; // Password for Login API.

var Response; // Response which is stored in array so we can decode it.
var QueueToken = ""; // String variable for when you're returned with a queue token.
var Gameserver = ""; // The IP of the server which will be pinged.

var GameserverStatus; // Boolean which determines the status of the Gameserver.
var LoginServer; // Boolean which determines the status of the LoginServer.

// Router Functions

module.exports = {
  returnServerStatus: function (req, res) {
    captureLoginData();
    setTimeout(function () {
      res.send({ 'gameserver': Gameserver });
    }, 4000); // This will be lowered in production. It's only high because of my delay.
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
    return Gameserver;
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
  return Gameserver;
}

function checkServers () {

}

// Finalise

console.log('[Status] No errors are detected. Continuing...');
