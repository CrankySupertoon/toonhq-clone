// Server Status -- ToonHQ Clone
// Created by @gaarb

// Modules

var request = require('request');

// Variables

var LoginURL = "https://toontownrewritten.com/api/login?format=json";
var Username = ""; // Username for Login API
var Password = ""; // Password for Login API

// Router Functions

module.exports = {
  grabServerStatus: function (req, res) {
    request.post({
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      url: LoginURL,
      body: "username="+ Username +"&password="+ Password +""
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
    });
  }
};

// Normal Functions

console.log('[Status] No errors are detected. Continuing...');
