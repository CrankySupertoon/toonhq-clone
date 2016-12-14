// This is the main server file.
// Subject to be dirty.

// Modules

var request = require('request');

// Variables

var InvasionURL = "https://toontownrewritten.com/api/invasions"; // URL from Toontown Rewritten Data
var InvasionData = []; // Array for Invasion Data

// Functions

module.exports = {

  grabInvasionList: function (req, res) {
    request({
      url: InvasionURL,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
        console.log('[Invasions.js] Sent InvasionList to requested Client-Agent');
      }
    });
  }

};

console.log('[Invasions.js] No errors are detected. Success');

// function updateInvasionList() {
//   // Update Invasion List.
// }
//
// function returnInvasionList() {
//   // Return to the user
// }
