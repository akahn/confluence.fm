//= require 'jquery.mustache'
//= require 'deck'
//= require 'players'
//= require 'track'
//= require 'playlist'

window.fbAsyncInit = function() {
  FB.init({
    appId: Confluence.appId
  });
};

$(document).ready(function() {
  $('#load').click(function() {
    FB.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        // Logged in and app is authorized
        loadFeed();
      }
      else {
        // Logged out and/or app is authorized
        FB.login(function(response) {
          console.log('login', response);
          if (response.status == "connected") {
            loadFeed();
          }
        }, {perms: 'read_stream'});
      }
    });
  });

  $('tr a').live('click', function() {
    $(this).closest('tr').remove();
  });

  $('#play').click(function() {
    var ids = extractVideoIds();
    embedVideo(ids);

    Confluence.player = new Confluence.Player(Confluence.playlist);
    Confluence.player.play();
    $(this).hide();
    $('#next').show();
    $('.kill-row').remove();
  });

  $('#next').click(function() {
    Confluence.player.next();
  });
});

$('tbody tr').live('mouseenter', function(e) {
  $('.kill-row a', this).css('visibility', 'visible');
}).live('mouseleave', function(e) {
  $('.kill-row a', this).css('visibility', 'hidden');
});

function extractVideoIds() {
  return $('tbody tr').map(function(i, elem) {
    return $(elem).attr('data-id');
  }).get();
}

function loadFeed() {
  $('#load').hide();
  $('#loading').show();

  FB.api('/me/home', {limit: 200}, function(response) {
    if (response.data) {
      renderList(response.data);
    }
    else {
      alert(response.error.message);
    }
  });
}

function renderList(response) {
  Confluence.playlist = Confluence.Playlist.createFromFeedItems(response);

  $('#loading').hide();
  $('#play').show();
  $('table').show().find('tbody').append(Confluence.playlist.render());
}

function embedVideo(ids) {
  var firstId = ids.shift();
  swfobject.embedSWF("http://www.youtube.com/v/" + firstId + "?enablejsapi=1&playerapiid=video&autoplay=1&playlist=" + ids.join(',') + '&playnext=1&version=3', "video", "825", "356", "8", null, null, null, null);
}

// Load the YouTube JS asynchronously
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Load the Facebook JS asynchronously
(function(d){
   var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   d.getElementsByTagName('head')[0].appendChild(js);
 }(document));
