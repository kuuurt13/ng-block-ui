# NG Block UI

A Block UI implementation for Angular

[![npm](https://img.shields.io/npm/v/ng-block-ui.svg)](https://www.npmjs.com/package/ng-block-ui)
[![npm](https://img.shields.io/npm/dm/ng-block-ui.svg)](https://www.npmjs.com/package/ng-block-ui)
[![Build Status](https://travis-ci.org/kuuurt13/ng-block-ui.svg?branch=master)](https://travis-ci.org/kuuurt13/ng-block-ui)

## Installation
Add to your project via [npm](https://www.npmjs.com/package/ng-block-ui)

```bash
npm install ng-block-ui --save
```

Include the `BlockUIModule` in your main app module.

```js
// All other imports
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    BlockUIModule.forRoot()
  ],
  ...
})
export class AppModule { }
```
## Quick Start
Wrap your main components in your app root template with a `block-ui` component.

Import the `BlockUI` decorator into your component and declare a property with the decorator.
This decorator will auto wire this property to the main Block UI instance of your app.

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

## Settings
Settings can be changed on the module level and component/directive level. Also, in some cases settings can be overwritten via the method level.

### Default Message
A default message can be configured to be shown instead of passing a message each time to the `start` method. The default message will be shown any time blocking is activated.

| Setting   | Type     | Description                                    |
|-----------|----------|------------------------------------------------|
| `message` | `string` | Custom message to be displayed while blocking. |

#### Module Level
```ts
@NgModule({
  imports: [
    BlockUIModule.forRoot({
      message: 'Default Message'
    })
  ],
  ...
})
export class AppModule { }
```

#### Component Level
```html
<block-ui message="Default Message">
  <!-- Markup here -->
</block-ui>
```

#### Method Level
```js
@Component({
  ...,
  template: `
    <block-ui message="Default Message">
      <!-- Your markup here -->
    </block-ui>
  `
})
export class Cmp {
  @BlockUI() blockUI: NgBlockUI;

  defaultMessage() {
    this.blockUI.start(); // "Default Message" will display
  }

  customMessage() {
    this.blockUI.start('Updating...'); // "Updating..." will display
  }
}
```

### Delay Start/Stop
When blocking with fast service calls the block overlay can flicker for a small amount of time.
To prevent this a `delayStart` and a `delayStop` can be configured to prevent this scenario.

| Setting      | Type     | Description                                                       |
|--------------|----------|-------------------------------------------------------------------|
| `delayStart` | `number` | Waits given amount of milliseconds before starting to block.      |
| `delayStop`  | `number` | Waits given amount of milliseconds before stopping current block. |

#### Module Level
```ts
@NgModule({
  imports: [
    BlockUIModule.forRoot({
      delayStart: 500,
      delayStop: 500
    })
  ],
  ...
})
export class AppModule { }
```

#### Component Level
```html
<block-ui [delayStart]="500" [delayStop]="500">
  <!-- Your app markup here -->
</block-ui>
```
### Custom Template
If you want to display other markup than the default spinner and message then you can provide a custom template.
Custom templates can be provided as a `Component` or `TemplateRef`. The template will then be used instead of the default template whenever blocking.

| Setting    | Type                                      | Description                              |
|------------|-------------------------------------------|------------------------------------------|
| `template` | <code>Component &#124; TemplateRef</code> | Custom template to be used when blocking |

#### Component Custom Template
Create a component and declare it in your app module.
The component also will need to be added to the `entryComponents` property of the module.

*Example Component:*

*Note: When providing a `Component` as a template just add the `{{message}}`
interpolation to your template and it will display your default message or the message passed to the `start` method.*

```js
// Template component
// Use block-ui-template class to center div if desired
@Component({
  template: `
    <div class="block-ui-template">
      <img src="logo.png" />
      <p>{{message}}</p>
    </div>
  `
})
export class BlockTemplateCmp {}
```

##### Module Level
```js
@NgModule({
  imports: [
    BlockUIModule.forRoot({
      template: BlockTemplateCmp
    })
  ],
  declarations: [
    ...,
    BlockTemplateCmp // Declare template component
  ],
  entryComponents: [ BlockTemplateCmp ]
})
export class AppModule { }
```

##### Component Level
```js
@Component({
  selector: 'app-root',
  template: `
    <block-ui [template]="blockTemplate">
      <!-- Your markup here -->
    </block-ui>
  `
})
export class AppComponent {
  // Declare template component
  blockTemplate: BlockTemplateCmp = BlockTemplateCmp;
}
```

#### TemplateRef Custom Template
Add a `<ng-template>` with a template reference variable to the view. Then pass the template reference variable to the `blockUI` component using the `[template]` property.

*Note: TemplateRef templates can only be set on a Component level.*


##### Component Level
```js
@Component({
  selector: 'cmp',
  template: `
    <ng-template #blockTemplate>
      <div class="block-ui-template">
        <img src="logo.png" />
      </div>
    </ng-template>

    <block-ui [template]="blockTemplate">
      <!-- Your app markup here -->
    </block-ui>
  `
})
export class Cmp {}
```

## Block UI Directive
Sometimes you want to only apply blocking to a certain element in your app.
The Block UI directive can be added to an element to apply blocking only to that specific element.

Add the `*blockUI` structural directive to any element
and pass it an instance name `*blockUI="'contact-list'"`.

Then in a component create a class property using the Block UI decorator with the instance name `@BlockUI('contact-list')`. This will then take care of wiring up that property to point to that specific instance in your app.

```js
@Component({
  selector: 'app-cmp',
  template: `
    <div>
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

### Directive Settings
Angular has a specific syntax for passing properties to structural directives. Properties are passed in `key: value;` pair. To pass settings to a Block UI directive they must be passed as shown below.

```html
<div *blockUI="'instance-name'; message: 'Loading'; template: blockTemplate">
</div>
```

## NgBlockUI Instance
Below highlights all the properties that can be found on a BlockUI instance when a class property is decorated with the `@BlockUI()` decorator.

| Property      | Description                                                                                                                                                |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`        | Name of the targeted instance (defaults to main instance).                                                                                                 |
| `isActive`    | Indicates if the targeted instance is blocking.                                                                                                            |
| `start`       | Starts blocking for instance, can be passed an optional message.                                                                                           |
| `stop`        | Stops blocking for instance.                                                                                                                               |
| `reset`       | Stops blocking for all currently blocking instances app wide regardless of the `delayStop` option.                                                         |
| `update`      | Updates current instances blocking message with the passed message.                                                                                        |
| `unsubscribe` | Unsubscribe an instance so it no longer can be blocked. All BlockUI components/directives unsubscribe by default during `onDestroy`                        |

## BlockUIService
In some cases you may want to have more control over all the instances in you app.
Instead of declaring seperate instances with the `@BlockUI()` decorator you can use the `BlockUIService`. This service allows you to easily target multiple instance across your app.

| Method        | Parameters                                                 | Description                                                                              |
|---------------|------------------------------------------------------------|------------------------------------------------------------------------------------------|
| `isActive`    | <code>target: string &#124; string[]</code>                | Indicates if the targeted instance(s) is blocking.                                       |
| `start`       | <code>target: string &#124; string[], message?: any</code> | Starts blocking for a single instance or multiple instances by passing instance name(s). |
| `stop`        | <code>target: string &#124; string[]</code>                | Stops blocking for a single instance or multiple instances by passing instance name(s).  |
| `reset`       | <code>target: string &#124; string[]</code>                | Resets blocking for a single instance or multiple instances by passing instance name(s). |
| `unsubscribe` | <code>target: string &#124; string[]</code>                | Unsubscribes a single instance or multiple instances by passing instance name(s).        |

## Other Modules
### [Http Module](docs/http-module.md) - Automatically block during http requests
### [Router Module](docs/router-module.md) - Prevent route changes while blocking

## Guides
### [Upgrading to 2.0.0](docs/migration-2.0.0.md)
### [SystemJS Config](docs/systemjs-config.md)

## Examples
### BlockUI Component - [Stackblitz](https://stackblitz.com/github/kuuurt13/ng-block-ui/tree/master/examples/default)
### BlockUI Component Default Message - [Stackblitz](https://stackblitz.com/github/kuuurt13/ng-block-ui/tree/master/examples/default-message)
### BlockUI Directive - [Stackblitz](https://stackblitz.com/github/kuuurt13/ng-block-ui/tree/master/examples/directive)
### BlockUI Custom Spinner Styles - [Stackblitz](https://stackblitz.com/github/kuuurt13/ng-block-ui/tree/master/examples/custom-spinner-styles)
### BlockUI Custom Template - [Stackblitz](https://stackblitz.com/github/kuuurt13/ng-block-ui/tree/master/examples/custom-template)
