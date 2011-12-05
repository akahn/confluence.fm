//= require 'jquery.mustache'
//= require 'deck'
//= require 'players'
//= require 'track'
//= require 'playlist'

window.fbAsyncInit = function() {
  FB.init({
    appId      : Confluence.appId,
    status     : true, // check login status
    authResponse: true,
    oath: true,
    cookie: true
  });
};

$(document).ready(function() {
  $('#load').click(function() {
    if (FB.getSession()) {
      loadFeed();
    }
    else {
      FB.login(function(response) {
        if (response.status == "connected") {
          loadFeed();
        }
      }, {perms: 'read_stream'});
    }
  });

  $('tr a').live('click', function() {
    $(this).closest('tr').remove();
  });

  $('#play').click(function() {
    var ids = extractVideoIds();
    embedVideo(ids);

    $(this).hide();
    $('.kill-row').remove();
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
  var playlist = Confluence.Playlist.createFromFeedItems(response);
  console.log(playlist);

  $('#loading').hide();
  $('#play').show();
  $('table').show().find('tbody').append(playlist.render());
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
