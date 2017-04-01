// Invasion Status -- ToonHQ Clone
// Created by @snrgabe

// Modules

var request = require('request');
var looper = require('infinite-loop');
var colours = require('colors');

// Setups

var loop = new looper;

// Variables

var InvasionURL = "https://toontownrewritten.com/api/invasions"; // URL from Toontown Rewritten Data.
var InvasionData = []; // Array for Data
var currentInvasions = []; // The current Invasions go in here.
var InvasionSchema = { 'id': '', 'district': '', 'type': '', 'progress': '', 'asOf': '' }; // Schema for adding data to InvasionData.
var RemoveSchema = { 'district': '' };
var RemoveInvasion = []; // List to remove invasions that aren't active.

// Router Functions

module.exports = {
  sendInvasionList: function (req, res) {
    res.send(InvasionData);
  }
};

// Normal Functions

function removeInvasion (array, delList) {
  for(var i = 0; i < array.length; i++) {
    var obj = array[i];

    if(delList.indexOf(obj.district) !== -1) {
        arrayOfObjects.splice(i, 1);
        i--;
    }
  }
}

function organiseInvasions () {
  var i = 0;
  var curInv = currentInvasions.invasions;
  InvasionData = []; // Clear Array
  for (var district in curInv) {
    if (curInv.hasOwnProperty(district)) {
      i++;
      InvasionSchema = {};
      InvasionSchema.id = i;
      InvasionSchema.district = district;
      InvasionSchema.type = curInv[district].type;
      InvasionSchema.progress = curInv[district].progress;
      InvasionSchema.asOf = curInv[district].asOf;
      InvasionData.push(InvasionSchema);
    }
  }
}

function grabInvasionList() {
  request({
    url: InvasionURL,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      currentInvasions = body; // Puts the body data into the InvasionData array.
    } else if (body.invasions == {}) {
       InvasionData = { 'banner': 'There are currently no invasions.' };
    } else {
      // Detection if API is down.
      InvasionData = { 'banner': 'Toontown Rewritten API is currently down.' };
    }
  });
}

function execute() {
  grabInvasionList();
  setTimeout(function () {
    organiseInvasions();
  }, 3000);
}

// Looping functions -- I don't want to depend on the front-end pinging the server incase it breaks, plus others might like to use it.

loop.add(execute, []); // Adding the function 'grabInvasionList' to the looper.
loop.setInterval(5000); // Every 5 seconds it'll update the list.

loop.run(); // Finally running the function.

// Finalise

console.log('[Invasions] No errors are detected. Continuing...'.green);
