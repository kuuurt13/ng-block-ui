# Contributing Guidelines
Pull request are always welcome and I appreciate any help on this project. This doc will hopefully make it easier for people to help contribute to this project.

## Setup
* Fork the repo and clone the repo locally
* Install main library dependencies
  * Run `npm install` in the root of the project
* Install demo dependencies
  * Change to the `demo` directory
  * Run `npm install` to install demo dependencies

## Local Development
This repo contains a `demo` directory to make it easier to test and debug changes made to the library. Currently, it just is used to test components but in the future I would like this to turn into interactive examples for the docs as well.

### Steps for Local Development
* In the root folder run `npm start`. This will watch the `lib` folder for changes and then transpile any changes. Once transpiled, the changes will copied to the `demo` directory and replace the `ng-block-ui` dependency.
* In a separate terminal run `npm start` in the `demo` directory. This will spin up a server with the demo app. Whenever changes are made to the `demo` or `lib` directory the server will reload.

## Git

### Commit Messages
To make it easier to generate a changelog the npm [generate-changelog](https://www.npmjs.com/package/generate-changelog) is used. For this to work the following commit schema should be used for all commit messages. *More info can be found [here](https://www.npmjs.com/package/generate-changelog#usage) and please look at past commit messages for reference*

```
type(category): description (#issue)
```

* **type:** Type of change - *examples: feat, fix, task*
* **category:** Section being changed - *examples: docs, directive, module*
* **description:** Short description of changes
* **issue:** Github issue number that your commit addresses

### Pull Request
Please use the same name as your git commit message for the pull request title. Also include a quick description of your changes.