# Configuring SystemJS

If your project is using SystemJS for module loading, you will need to add ng-block-ui to the SystemJS configuration:

```js
System.config({
  // Existing configuration options
  map: {
    ...
    'ng-block-ui': 'npm:ng-block-ui/bundles/umd'
  },
  packages: {
    ...
    'ng-block-ui': {
        main: 'index.js',
        defaultExtension: 'js'
    }
  }
});

```