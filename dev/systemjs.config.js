/**
 * PLUNKER VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    baseURL: '../',
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
      'bundles': 'bundles'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

      // other libraries
      'core-js':                    'npm:core-js',
      'rxjs':                       'npm:rxjs',
      'rxjs-compat':                'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'tslib':                      'npm:tslib/tslib.js',
      'ts':                         'npm:plugin-typescript/lib/plugin.js',
      'typescript':                 'npm:typescript/lib/typescript.js',
      'zone.js':                    'npm:zone.js',
      'ng-block-ui':                'bundles/umd/lib',
      'ng-block-ui/router':         'bundles/umd/router',
      'ng-block-ui/http':           'bundles/umd/http',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      'core-js': {},
      'rxjs': {'main': 'index.js','defaultExtension': 'js'},
      'rxjs/operators': {'main': 'index.js','defaultExtension': 'js'},
      'rxjs/internal-compatibility': {'main': 'index.js','defaultExtension': 'js'},
      'rxjs/testing': {'main': 'index.js','defaultExtension': 'js'},
      'rxjs/ajax': {'main': 'index.js','defaultExtension': 'js'},
      'rxjs/webSocket': {'main': 'index.js','defaultExtension': 'js'},
      'rxjs-compat': {'main': 'index.js','defaultExtension': 'js'},
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'zone.js': {
        main: './zone.js',
        defaultExtension: 'js'
      },
      'ng-block-ui': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'ng-block-ui/router': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'ng-block-ui/http': {
        main: 'index.js',
        defaultExtension: 'js'
      },
    }
  });
})(this);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/