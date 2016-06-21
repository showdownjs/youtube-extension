/*! showdown-youtube 21-06-2016 */
(function (extension) {
  'use strict';

  if (typeof showdown !== 'undefined') {
    extension(showdown);
  } else if (typeof define === 'function' && define.amd) {
    define(['showdown'], extension);
  } else if (typeof exports === 'object') {
    module.exports = extension(require('showdown'));
  } else {
    throw Error('Could not find showdown library');
  }

}(function (showdown) {

  var svg =
      '<div class="youtube-preview" style="width:%2; height:%3; background-color:#333; position:relative;">' +
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ' +
      '     width="100" height="70" viewBox="0 0 100 70"' +
      '     style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">' +
      '    <defs>' +
      '      <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">' +
      '        <stop offset="0%" style="stop-color:rgb(229,45,49);stop-opacity:1" />' +
      '        <stop offset="100%" style="stop-color:rgb(191,23,29);stop-opacity:1" />' +
      '      </linearGradient>' +
      '    </defs>' +
      '    <rect width="100%" height="100%" rx="26" fill="url(#grad1)"/>' +
      '    <polygon points="35,20 70,35 35,50" fill="#fff"/>' +
      '    <polygon points="35,20 70,35 64,37 35,21" fill="#e8e0e0"/>' +
      '</svg>' +
      '<div style="text-align:center; padding-top:10px; color:#fff"><a href="%1">%1</a></div>' +
      '</div>',
    img = '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" width="%2" height="%3">',
    iframe = '<iframe src="%1" width="%2" height="%3" frameborder="0" allowfullscreen></iframe>',
    imgRegex = /(?:<p>)?<img.*?src="(.+?)"(.*?)\/?>(?:<\/p>)?/gi,
    fullYoutubeRegex = /(?:(?:https?:)?(?:\/\/)?)(?:(?:www)?\.)?youtube\.(?:.+?)\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9_-]{11})/i,
    shortYoutubeRegex = /(?:(?:https?:)?(?:\/\/)?)?youtu\.be\/([a-zA-Z0-9_-]{11})/i,
    vimeoRegex = /(?:(?:https?:)?(?:\/\/)?)(?:(?:www)?\.)?vimeo.com\/(\d+)/;

  function parseDimensions(rest) {
    var width,
      height,
      d;

    if (rest) {
      width = (d = /width="(.+?)"/.exec(rest)) ? d[1] : '420';
      height = (d = /height="(.+?)"/.exec(rest)) ? d[1] : '315';
    }
    if (/^\d+$/gm.exec(width)) {
      width += 'px';
    }
    if (/^\d+$/gm.exec(height)) {
      height += 'px';
    }

    return {
      width: width,
      height: height
    };
  }

    showdown.extension('youtube', function () {
    return [
      {
        type: 'output',
        filter: function (text, converter, options) {
          var tag = iframe;
          if (options.smoothLivePreview) {
            tag = (options.youtubeUseSimpleImg) ? img : svg;
          }
          return text.replace(imgRegex, function (match, url, rest) {
            var d = parseDimensions(rest),
              m, fUrl = '';
            if ((m = shortYoutubeRegex.exec(url)) || (m = fullYoutubeRegex.exec(url))) {
              fUrl = '//www.youtube.com/embed/' + m[1] + '?rel=0';
            } else if ((m = vimeoRegex.exec(url))) {
              fUrl = '//player.vimeo.com/video/' + m[1];
            } else {
              return match;
            }
            return tag.replace(/%1/g, fUrl).replace('%2', d.width).replace('%3', d.height);
          });
        }
      }
    ];
  });
}));

//# sourceMappingURL=showdown-youtube.js.map