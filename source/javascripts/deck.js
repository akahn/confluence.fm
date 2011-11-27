Confluence.Deck = function(playlist) {
  this.playlist = playlist
}

_.extend(Confluence.Deck.prototype, {
  load: function(track) {
    var player;

    this.unload();
    player = track.play();
    this.currentTrack = track;
  },

  unload: function() {
    $('#video').empty();
  }
});
