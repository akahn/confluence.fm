Confluence.Player = function(playlist) {
  this.playlist = playlist;
}

_.extend(Confluence.Player.prototype, {
  // Embed video player, begin playing first video
  play: function() {
    var player = this,
        options = {allowScriptAccess: 'always'};

    swfobject.embedSWF("http://www.youtube.com/v/" + this.playlist.nextId() + "?enablejsapi=1&playerapiid=video&autoplay=1&version=3", "video", "825", "356", "8", null, null, options);
  },

  next: function() {
    this.youtube.loadVideoById(this.playlist.nextId());
  },

  // Called on YouTube video state change
  handleStateChange: function(state) {
    if (state === 0) { // Video ended; load the next one
      this.next();
    }
  }
});

function onYouTubePlayerReady(playerId) {
  Confluence.player.youtube = document.getElementById(playerId);
  Confluence.player.youtube.addEventListener('onStateChange', 'Confluence.player.handleStateChange');
}
