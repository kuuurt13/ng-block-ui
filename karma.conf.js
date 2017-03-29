'use strict';

module.exports = config => {
  config.set({
    autoWatch: true,
    browsers: ['Chrome'],
    files: [
      'karma.shim.js'
    ],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'karma.shim.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: require('./webpack.config.js'),
    webpackServer: {
      noInfo: true
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
