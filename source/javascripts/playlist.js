Confluence.Playlist = function(tracks) {
  var playlist = this;
  this.tracks  = [];
  this.current = 0;

  _.each(tracks, function(track) {
    return playlist.addTrack(track);
  });
};

Confluence.Playlist.createFromFeedItems = function(items) {
  var tracks = _(items).filter(function(item) {
    return item.type == 'video' && item.source.match('youtu\.?be');
  }).map(function(item) {
    return Confluence.Track.createFromFeedItem(item);
  });

  return new Confluence.Playlist(tracks);
};

_.extend(Confluence.Playlist.prototype, {
  addTrack: function(track) {
    this.tracks.push(track);
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
