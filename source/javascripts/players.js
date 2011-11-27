Confluence.Players = {
  youtube: {
    play: function(id) {
      swfobject.embedSWF("http://www.youtube.com/v/" + id + "?enablejsapi=1&playerapiid=video&autoplay=1&version=3", "video", "825", "356", "8", null, null, null, null);
    },

    image: function(id) {
      return "http://i.ytimg.com/vi/" + id + "/default.jpg"
    }
  }
}
