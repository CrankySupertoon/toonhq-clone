// Status.js Front End
// Developed by @gaarb

var APIUrl = "http://localhost:8080/api/v1/status"; // Setting the APIUrl.

var Banner = document.getElementById('banner');
var BannerMsg = document.getElementById('banner-msg');

$(document).ready(function () {
  setInterval(function () {
    $.getJSON(APIUrl, function (data) {
      if (data['login']) {
        $('#login-color').removeClass("offline");
        $('#login-color').addClass("online");
        $('#login-text').text('ONLINE');
      }
      if (data['gameserver']) {
        $('#game-color').removeClass("offline");
        $('#game-color').addClass("online");
        $('#game-text').text('ONLINE');
      }

      // Banner
      if (data.banner) {
        Banner.classList.remove('banner-disabled');
        BannerMsg.innerHTML = data.banner;
      } else {
        Banner.classList.add('banner-disabled');
      }

    })
    .fail(function() {
      $('#login-color').addClass("offline");
      $('#login-text').text('OFFLINE');

      $('#game-color').addClass("offline");
      $('#game-text').text('OFFLINE');

      Banner.classList.add('banner-disabled');
    });
  }, 1000);
});
