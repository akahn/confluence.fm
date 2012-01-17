Confluence.Player = function(playlist) {
  this.playlist = playlist;
}

_.extend(Confluence.Player.prototype, {
  play: function() {
    var player = this;

    swfobject.embedSWF("http://www.youtube.com/v/" + this.playlist.nextId() + "?enablejsapi=1&playerapiid=video&autoplay=1&version=3", "video", "825", "356", "8", function(event) {
      player.youtube = event.ref;
      player.bindListeners();
    });
  },

  bindListeners: function() {
    // http://code.google.com/apis/youtube/js_api_reference.html#Events
    this.youtube.addEventListener('onStateChange', function(state) {
      console.log(state);
      if (state == 0) { // Video ended; load the next one
        youtube.loadById(this.playlist.nextId());
      }
    });

    this.youtube.addEventListener('error', function(error) {
      alert('YouTube Error ' + error);
    });
  }
});
