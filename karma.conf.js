'use strict';

module.exports = config => {
  config.set({
    autoWatch: true,
    browsers: ['PhantomJS'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'karma.shim.js'
    ],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    phantomJsLauncher: {
      exitOnResourceError: true
    },
    port: 9876,
    preprocessors: {
      'karma.shim.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: require('./webpack.config.js'),
    webpackServer: {
      noInfo: true
    }
  });
};
