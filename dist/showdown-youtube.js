/*! showdown-youtube 05-06-2015 */

(function () {

  var iframe = '<iframe src="//www.youtube.com/embed/%1?rel=0" frameborder="0" allowfullscreen></iframe>',
    fullLink = /(?:(?:https?:)?(?:\/\/)?)(?:(?:www)?\.)?youtube\.(?:.+?)\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9_-]{11})/gi,
    shortLink = /(?:(?:https?:)?(?:\/\/)?)?youtu\.be\/([a-zA-Z0-9_-]{11})/gi;

  function youtube() {
    var replace = function (match, url) {
      var m;
      if ((m = shortLink.exec(url)) || (m = fullLink.exec(url))) {
        return iframe.replace('%1', m[1]);
      } else {
        return match;
      }
    };
    return [
      {
        type: 'lang',
        regex: '!\\[.*]\\s?\\([ \\t]*(\\S+?)[ \\t]*(?:[\'"].*?[\'"][ \\t]*)?\\)',
        replace: replace
      },
      {
        type: 'output',
        regex: '(?:<p>)<img src="(.+?)".+?\/>(?:</p>)',
        replace: replace
      }
    ];
  }
  if (typeof window !== 'undefined' && window.showdown && window.showdown.extensions) {
    window.showdown.extensions.youtube = youtube;
  }
  if (typeof module !== 'undefined') {
    module.exports = youtube;
  }

}());

//# sourceMappingURL=showdown-youtube.js.map