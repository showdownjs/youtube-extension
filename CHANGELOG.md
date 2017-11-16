<a name="1.3.0"></a>
## [1.3.0](https://github.com/showdownjs/youtbe-extension/compare/1.2.1...v1.3.0)

#### Features
* Allow YouTube configuration to include `enablejsapi=1` into the final URL, which enables the JS api for YouTube videos.
  * [YouTube Docs](https://developers.google.com/youtube/player_parameters#enablejsapi)

<a name="1.2.1"></a>
## [1.2.1](https://github.com/showdownjs/youtbe-extension/compare/1.2.0...v1.2.1) (2016-11-29)

#### Features
* **defaultSizes:** allows a user to override the default height or width by passing in youtubeHeight or youtubeWidth
    into showdown settings ([26b220a](https://github.com/showdownjs/youtube-extension/commit/26b220a663a5bd480141304976f42eba215da75a))


<a name="1.2.0"></a>
## 1.2.0 (2016-11-23)

#### Fix
* **output:** force HTTPS protocol in output ([fa1d360](https://github.com/showdownjs/youtube-extension/commit/fa1d3608449a876f1e475e054c2c84fc070946b6))


<a name="1.1.0"></a>
## 1.1.0 (2016-06-21)

#### Features
* **vimeo:** Add vimeo support ([07d02e6](https://github.com/showdownjs/youtube-extension/commit/07d02e6db4f7ee5be6c88cffb9a0fb31d5ce9d8f))


<a name="1.0.0"></a>
## 1.0.0 (2015-07-21)

#### Release information

Release of youtube extension compatible with showdown ^1.0.0

#### Compatibility

**Compatible with showdown v.1.x.x**

#### Features

* **video size**: enables setting video size using image dimensions syntax.
* **smooth live preview**: enables smooth preview in live editors by replacing the iframe with an image. This option
    should be disabled when parsing the final document.
