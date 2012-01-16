Confluence.Playlist = function(tracks) {
  this.tracks  = [];
  this.current = 0;
};

Confluence.Playlist.createFromFeedItems = function(items) {
  var playlist = new Confluence.Playlist(),
      tracks   = _(items).filter(function(item) {
    return item.type == 'video' && item.source.match('youtu\.?be');
  }).map(function(item) {
    return Confluence.Track.createFromFeedItem(item);
  });

  playlist.addTracks(tracks)

  return playlist;
};

_.extend(Confluence.Playlist.prototype, {
  // Add one or more tracks to the end of the playlist
  addTracks: function(tracks) {
    var playlist = this;
    _.chain([tracks]).flatten().each(function(track) {
      playlist.tracks.push(track);
    });
  },

  next: function() {
    this.tracks.shift().play();
  },

  template: function() {
    return $('#playlist-template').html();
  },

  render: function() {
    var template = this.template();
    return $.mustache(template, {tracks: this.tracks});
  }
});
