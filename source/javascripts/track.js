Confluence.Track = function(params) {
  this.id = params.id;
  this.name = params.name;
  this.from = params.from;
  this.service = Confluence.Players[params.service];
  this.image = this.service.image(this.id);
};

Confluence.Track.createFromFeedItem = function(item) {
  var extractId = function(url) {
    return url.match(/v\/(.+)\?/)[1];
  }

  return new Confluence.Track({
    id:      extractId(item.source),
    name:    item.name,
    from:    item.from.name,
    service: 'youtube'
  });
}

_.extend(Confluence.Track.prototype, {
  play: function() {
    Confluence.Players[this.service].play(this.id);
  }
});
