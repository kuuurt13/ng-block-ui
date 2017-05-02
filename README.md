# NG Block UI

A Block UI implementation for Angular 2 & up

[![npm](https://img.shields.io/npm/v/ng-block-ui.svg)](https://www.npmjs.com/package/ng-block-ui)
[![Build Status](https://travis-ci.org/kuuurt13/ng-block-ui.svg?branch=master)](https://travis-ci.org/kuuurt13/ng-block-ui)

## Installation
Add to your project via [npm](https://www.npmjs.com/package/ng-block-ui)

```bash
// Angular 2.x
npm install ng-block-ui --save

-- or --

// Angular 4.x
npm install ng-block-ui@next --save
```

#### Configuring SystemJS

If your project is using SystemJS for module loading, you will need to add ng-block-ui to the SystemJS configuration:

```js
System.config({
  // Existing configuration options
  map: {
    ...
    'ng-block-ui': 'npm:ng-block-ui/bundles/umd',
    ...
  },
  packages: {
    ...
    'ng-block-ui': {
        main: 'index.js',
        defaultExtension: 'js'
    },
    ...
  }
});

```

Include the `BlockUIModule` in your main app module.

```js
// All other imports
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
   ... // Your main app component
  ],
  imports: [
    ..., // Other imports
    BlockUIModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```
## Usage

### Block UI Component
Wrap all components in your app root template with a `block-ui` component.

Import the `BlockUI` decorator into your component and declare a variable with the decorator.
This decorator will auto wire this variable to the main Block UI instance of your app.

To start blocking your app, simply invoke the `start` method.
This method also can take a custom message to display while blocking.
Once finished call the `stop` method to stop blocking the app.

```js
import { Component } from '@angular/core';

// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  template: `
    <block-ui>
      <!-- Your app markup here -->
    </block-ui>
  `
})
export class AppComponent {
  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  constructor() {
    this.blockUI.start('Loading...'); // Start blocking

    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
    }, 2000);
  }
```

#### Default Message
A default message can be configured to be shown instead of passing a message each time to the start method.
The default message will be shown any time blocking is activated. A message can still be passed to the start method
and it will take precedence over the default message.

```js
// Imports

@Component({
  selector: 'app-root',
  template: `
    <block-ui [message]="'Loading...'">
      <!-- Your app markup here -->
    </block-ui>
  `
})
export class AppComponent {
  @BlockUI() blockUI: NgBlockUI;

  constructor() {
    this.blockUI.start(); // Default "Loading..." message will display
    this.blockUI.start('Updating...'); // Custom "Updating..." message will display
  }
```

### Block UI Directive
Sometimes you want to only apply blocking to a certain element in your app.
The Block UI directive can be added to an element to apply blocking only to that specific element.

Add the `*blockUI` structural directive to any element
and pass it an instance name `*blockUI="'contact-list'"`.

Then in a component create a variable using the Block UI decorator with the instance name.
This will then take care of wiring up that variable to point to that specific instance in your app `@BlockUI('contact-list')`.

```js
... // Imports

@Component({
  selector: 'app-cmp',
  template: `
    <div>
      <!-- Other markup -->
      <div *blockUI="'contact-list'">
        <!-- List markup -->
      </div>
    </div>
  `
})
export class AppComponent {
  // Pass instance name to decorator
  @BlockUI('contact-list') blockUIList: NgBlockUI;

  constructor() {
    this.blockUIList.start('Loading...'); // Start blocking element only
    this.blockUIList.stop(); // Stop blocking
  }
```

### NgBlockUI Instance
| Method | Description
|---|---|
| `start` | Starts blocking for instance, can be passed an optional message.
| `stop` | Stops blocking for instance.
| `reset` | Stops blocking for all currently blocking instances app wide.
| `update` | Updates current instances blocking message with the passed message.
| `unsubscribe` | Unsubscribe an instance so it no longer can be blocked. All BlockUI components/directives unsubscribe during the `onDestroy` lifecycle hook. In some cases it might be desirable to unsubscribe while the component/element is still in the view.

### BlockUIService
In some cases you may want to have more control over all the instances in you app.
Instead of declaring seperate instances with the `@BlockUI()` decorator you can use the `BlockUIService`. This service allows you to easily target multiple instance across your app.

| Method | Parameters | Description
|---|---|---|
| `start` | `target: string \| string[], message?: string` | Starts blocking for a single instance or multiple instances by passing instance name(s).
| `stop` | `target: string \| string[]` | Stops blocking for a single instance or multiple instances by passing instance name(s).
| `unsubscribe` | `target: string \| string[]` | Unsubscribes a single instance or multiple instances by passing instance name(s).


## Examples
### BlockUI Component - [Plunker](https://plnkr.co/edit/ZVDRrq?p=preview)
### BlockUI Component Default Message - [Plunker](https://plnkr.co/edit/oTBw4G?p=preview)
