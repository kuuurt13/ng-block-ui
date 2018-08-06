# Configuring SystemJS

If your project is using SystemJS for module loading, you will need to add ng-block-ui to the SystemJS configuration:

```js
System.config({
  // Existing configuration options
  map: {
    ...
    'ng-block-ui':        'npm:ng-block-ui/bundles/ng-block-ui.umd.js', // Required
    'ng-block-ui/http':   'npm:ng-block-ui/bundles/ng-block-ui-http.umd.js', // Optional
    'ng-block-ui/router': 'npm:ng-block-ui/bundles/ng-block-ui-router.umd.js' // Optional
  }
});
```