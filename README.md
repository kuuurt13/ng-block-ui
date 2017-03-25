## NG Block UI

A Block UI implementation for Angular 2 & up

[![npm](https://img.shields.io/npm/v/ng-block-ui.svg)](https://www.npmjs.com/package/ng-block-ui)
[![Build Status](https://travis-ci.org/kuuurt13/ng-block-ui.svg?branch=master)](https://travis-ci.org/kuuurt13/ng-block-ui)

### Install
Install into project via [npm](https://www.npmjs.com/package/ng-block-ui)

```bash
// Angular 2.x
npm install ng-block-ui --save

-- or --

// Angular 4.x
npm install ng-block-ui@next --save
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
### Usage
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
