## NG Block UI

A Block UI implementation for Angular (2 & up)

### Install
Install into project via `npm`

	npm install ng-block-ui

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
Add the `*blockUI` directive to the outermost element of your app.

Inject the `BlockUI` decorator into your component and declare a variable with the decorator.
This decorator will auto wire this variable to the main Block UI instance of your app.

To start blocking your app simply invoke the `start` method.
This method also can take a custom message to display while blocking.
Once finished call the `stop` method to stop blocking the app.

```js
import { Component } from '@angular/core';

// Inject BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  template: `
    <div *blockUI>
   	 // Your app here
    </div>
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