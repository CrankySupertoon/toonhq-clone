// Invasion Status -- ToonHQ Clone
// Created by @gaarb

// Modules

var request = require('request');
var looper = require('infinite-loop');

// Setups

var loop = new looper;

// Variables

var InvasionURL = "https://toontownrewritten.com/api/invasions"; // URL from Toontown Rewritten Data
var InvasionData = []; // Array for Invasion Data

// Router Functions

module.exports = {
  sendInvasionList: function (req, res) {
    res.send(InvasionData);
  }
};

// Normal Functions

function grabInvasionList() {
  request({
    url: InvasionURL,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      InvasionData = body;
    }
  });
}

// Looping functions -- I don't want to depend on the front-end pinging the server incase it breaks, plus others might like to use it.

loop.add(grabInvasionList, []); // Adding the function 'grabInvasionList' to the looper.
loop.setInterval(5000); // Every 5 seconds it'll update the list.

loop.run(); // Finally running the function.

// Finalise

console.log('[Invasions] No errors are detected. Continuing...');
