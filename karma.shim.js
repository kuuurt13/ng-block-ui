require('es6-shim');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/zone-testing');

const browserTesting = require('@angular/platform-browser-dynamic/testing');
const coreTesting = require('@angular/core/testing');
const context = require.context('./lib/', true, /\.spec\.ts$/);

Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

coreTesting.TestBed.resetTestEnvironment();
coreTesting.TestBed.initTestEnvironment(
    browserTesting.BrowserDynamicTestingModule,
    browserTesting.platformBrowserDynamicTesting()
);

context.keys().forEach(context);
