Showdown's Youtube Extension
==========================

[![Build Status](https://travis-ci.org/showdownjs/youtube-extension.svg)](https://travis-ci.org/showdownjs/youtube-extension) [![npm version](https://badge.fury.io/js/showdown-youtube.svg)](http://badge.fury.io/js/showdown-youtube) [![npm version](https://badge.fury.io/bo/showdown-youtube.svg)](http://badge.fury.io/bo/showdown-youtube)

------

**An extension to embed [Youtube](http://youtube.com/) videos in showdown documents using markdown syntax**

## Introduction

This extension enables embedding youtube videos using markdown's image syntax. Instead of creating a new definition,
it borrows image syntax `![foo][bar.jpg]` to create an inframe pointing to the desired video.
Although it uses the same syntax as images, only valid youtube video links are actually parsed.
Basically it looks for urls that start with:
 - `http://www.youtube.com/watch?v=` or `youtube.com/watch?v=`
 - `http://www.youtube.com/embed/` or `youtube.com/embed/`
 - `http://youtu.be/` or `youtu.be/`

## Installation

### With [npm](http://npmjs.org)

    npm install showdown-youtube

### With [bower](http://bower.io/)

    bower install showdown-youtube

### Manual

You can also [download the latest release zip or tarball](https://github.com/showdownjs/youtube-extension/releases) and include it in your webpage, after showdown:

    <script src="showdown.min.js">
    <script src="showdown-youtube.min.js">

## Enabling the extension

After including the extension in your application, you just need to enable it in showdown.

    var converter = new showdown.Converter({extensions: ['youtube']});

When using in node, ensure to first require the extension so it can register itself with showdown before any converters try to use it.

```javascript
var showdown = require('showdown');
require('showdown-youtube');
var converter = new showdown.Converter({extensions: ['youtube']});
```

## Example

```javascript
var converter = new showdown.Converter({extensions: ['youtube']}),
    input = '![youtube video](http://www.youtube.com/watch?v=dQw4w9WgXcQ)';
    html = converter.makeHtml(input);
console.log(html);
```

This should output the equivalent to:

```html
<iframe src="//www.youtube.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allowfullscreen></iframe>
```

## Video size

Since youtube extension uses the image syntax for videos, you can set the video dimensions the same way.

```md
![youtube video](http://www.youtube.com/watch?v=dQw4w9WgXcQ =800x600)
```

This should output the equivalent to:

```html
<iframe width="800px" height="600px" src="//www.youtube.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allowfullscreen></iframe>
```

You can also use units:

```md
![foo](youtu.be/dQw4w9WgXcQ =100x80)     simple, assumes units are in px
![bar](youtu.be/dQw4w9WgXcQ =100x*)      sets the height to "auto"
![baz](youtu.be/dQw4w9WgXcQ =80%x5em)   width of 80% and height of 5em
```



## Options

Youtube extension reads the options from Showdown Core. So, to pass an option, use the methods explained in
[Showdown's documentation](https://github.com/showdownjs/showdown#setting-options).


### smoothLivePreview

(borrowed from Showdown core)

When using the extension in live editors (for instance, with angularjs), every time the text is changed, a new iframe is created.
This leads to a lot of requests done to youtube, which translates as an overall feel of sluggishness.
Turning **smoothLivePreview** on replaces the actual video objects (iframes) with an image placeholder. This way the live editing
feels more smooth.

This should only be enabled during live preview and not on the final document.


### youtubeUseSimpleImg
Only used if smoothLivePreview is on.

Uses a simple black image preview instead of an svg. This is quicker and ensures max compatibility with older browsers.

Default is false


## License
These files are distributed under BSD license. For more information,
please check the [LICENSE file](https://github.com/showdownjs/youtube-extension/blob/master/LICENSE) in the source code.
