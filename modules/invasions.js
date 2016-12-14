// Invasion Status -- ToonHQ Clone
// Created by @gaarb

// Modules

var request = require('request');

// Variables

var InvasionURL = "https://toontownrewritten.com/api/invasions"; // URL from Toontown Rewritten Data
var InvasionData = []; // Array for Invasion Data

// Router Functions

module.exports = {
  sendInvasionList: function (req, res) {
    grabInvasionList();
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
      console.log(InvasionData);
    }
  });
}

console.log('[Invasions] No errors are detected. Continuing...');
