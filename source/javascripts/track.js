Confluence.Track = function(params) {
  this.id = params.id;
  this.name = params.name;
  this.from = params.from;
  this.image = "http://i.ytimg.com/vi/" + this.id + "/default.jpg"
};

Confluence.Track.createFromFeedItem = function(item) {
  var extractId = function(url) {
    return url.match(/v\/(.+)\?/)[1];
  }

  return new Confluence.Track({
    id:      extractId(item.source),
    name:    item.name,
    from:    item.from.name,
  });
}

_.extend(Confluence.Track.prototype, {
  play: function() {
    Confluence.Players[this.service].play(this.id);
  }
});
