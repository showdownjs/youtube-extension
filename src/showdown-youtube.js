/**
 * Youtube Extension.
 * Uses image syntax to embed videos
 * Usage:
 * ![youtube video][http://youtu.be/dQw4w9WgXcQ]
 *
 * or
 *
 * ![youtube video][1]
 * [1]: http://youtu.be/dQw4w9WgXcQ
 */

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
      // Inline style
      {
        type: 'lang',
        regex: '!\\[.*]\\s?\\([ \\t]*(\\S+?)[ \\t]*(?:[\'"].*?[\'"][ \\t]*)?\\)',
        replace: replace
      },
      // Reference Style
      // It's a bit hackish but we let the core parsers replace the reference image for an image tag
      // then we replace the full img tag in the output with our iframe
      {
        type: 'output',
        regex: '(?:<p>)<img src="(.+?)".+?\/>(?:</p>)',
        replace: replace
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.showdown && window.showdown.extensions) {
    window.showdown.extensions.youtube = youtube;
  }
  // Server-side export
  if (typeof module !== 'undefined') {
    module.exports = youtube;
  }

}());
