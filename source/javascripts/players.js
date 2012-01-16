Confluence.Player = function(playlist) {
  this.playlist = playlist;
  swfobject.embedSWF("http://www.youtube.com/v/VIDEOID?enablejsapi=1&playerapiid=video&autoplay=1&version=3", "video", "825", "356", "8", null, null, null, null);
}

_.extend(Confluence.Player.prototype, {
  play: function() {
    var player = document.getElementById('video'),
        id = this.playlist.next();

    player.loadVideoById(id);
  },
});
