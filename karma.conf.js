"use strict";

module.exports = (config) => {
  config.set({
    files: ["karma.shim.ts", "lib/**/*.ts", "http/**/*.ts", "router/**/*.ts"],
    exclude: ["examples", "dev"],
    autoWatch: true,
    frameworks: ["jasmine", "karma-typescript"],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
    reporters: ["spec", "karma-typescript"],
    singleRun: true,
    browsers: ["Chrome"],
    karmaTypescriptConfig: {
      include: [
        "karma.shim.ts",
        "lib/**/*.ts",
        "http/**/*.ts",
        "router/**/*.ts",
      ],
      exclude: ["node_modules", "examples", "dev"],
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "ng-block-ui": ["lib"],
        },
      },
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: "Chrome",
        flags: ["--no-sandbox"],
      },
    },
  });
};
