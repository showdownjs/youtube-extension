(function () {
  'use strict';

  require('chai').should();
  var showdown = require('showdown');
  require('../src/showdown-youtube.js');

  var fs = require('fs'),
      defaultConverter = new showdown.Converter({extensions: ['youtube']}),
      optionsConverter = new showdown.Converter({
        extensions: ['youtube'],
        youtubeHeight: 400,
        youtubeWidth: 400
      }),
      cases = fs.readdirSync('test/cases/')
        .filter(filter())
        .map(map('test/cases/')),
      issues = fs.readdirSync('test/issues/')
        .filter(filter())
        .map(map('test/issues/')),
      optionsCases = fs.readdirSync('test/optionsCases/')
        .filter(filter())
        .map(map('test/optionsCases/'));

  /////////////////////////////////////////////////////////////////////////////
  // Test cases
  //
  describe('Youtube Extension simple testcases', function () {
    for (var i = 0; i < cases.length; ++i) {
      it(cases[i].name, assertion(cases[i], defaultConverter));
    }
  });

  describe('Youtube Extension issues testcases', function () {
    for (var i = 0; i < issues.length; ++i) {
      it(issues[i].name, assertion(issues[i], defaultConverter));
    }
  });

  describe('Youtube Extension converter options testcases', function () {
    for (var i = 0; i < optionsCases.length; ++i) {
      it(optionsCases[i].name, assertion(optionsCases[i], optionsConverter));
    }
  });

  /////////////////////////////////////////////////////////////////////////////
  // Test cases
  //
  function filter() {
    return function (file) {
      var ext = file.slice(-3);
      return (ext === '.md');
    };
  }

  function map(dir) {
    return function (file) {
      var name = file.replace('.md', ''),
          htmlPath = dir + name + '.html',
          html = fs.readFileSync(htmlPath, 'utf8'),
          mdPath = dir + name + '.md',
          md = fs.readFileSync(mdPath, 'utf8');

      return {
        name:     name.replace(/_/g, ' '),
        input:    md,
        expected: html
      };
    };
  }

  //Normalize input/output
  function normalize(testCase) {

    // Normalize line returns
    testCase.expected = testCase.expected.replace(/\r/g, '');
    testCase.actual = testCase.actual.replace(/\r/g, '');

    // Ignore all leading/trailing whitespace
    testCase.expected = testCase.expected.split('\n').map(function (x) {
      return x.trim();
    }).join('\n');
    testCase.actual = testCase.actual.split('\n').map(function (x) {
      return x.trim();
    }).join('\n');

    // Remove extra lines
    testCase.expected = testCase.expected.trim();

    return testCase;

  }

  function assertion(testCase, converter) {
    return function () {
      testCase.actual = converter.makeHtml(testCase.input);
      testCase = normalize(testCase);

      // Compare
      testCase.actual.should.equal(testCase.expected);
    };
  }
})();
