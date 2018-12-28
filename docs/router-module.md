# Router Module

## Prevent Navigation During Active Block UI
This module allows for blocking route changes when Block UI is active.

### Import Modules
The core `BlockUIModule` should first be imported within the app. Once added, a separate module called `BlockUIRouterModule` should then be imported to allow for route blocking.

```js
import { RouterModule } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIRouterModule } from 'ng-block-ui/router';
import { appRoutes } from './app.routes';

@NgModule({
  imports: [
    BlockUIModule.forRoot(), // Import BlockUIModule
    BlockUIRouterModule.forRoot(), // Import before Routes
    RouterModule.forRoot(appRoutes) // Import app routes
  ],
  ...
})
export class AppModule {}
```

### Add Block UI Route Guard to Routes
Next, import `BlockUIPreventNavigation` guard from `ng-block-ui/router`. This is the guard that should be added for all routes that you don't want to be navigated away from when Block UI is active.

#### Imports
```js
import { Routes } from '@angular/router';
import { BlockUIPreventNavigation } from 'ng-block-ui/router';
// Other Components
```

#### Add Block UI Guard for specific Routes
The guard can be added to specific routes by adding it to the `canActivate` property of that route.

In the example below
a user cannot navigate from the `login` route when the Block UI is active.

```js
export appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      BlockUIPreventNavigation // Add Block UI Route Guard
    ]
  }
];
```

#### Add Block UI Guard for all Routes
The guard can also be added for all routes for an app. To achieve this a parent route with a blank path should be added. Then the `BlockUIPreventNavigation` guard should be added to the `canActivateChild` property of the parent route.

In the example below a user cannot navigate from any routes when the Block UI is active.

```js
export appRoutes: Routes = [
  {
    path: '', // Create a parent route with no path
    canActivateChild: [ BlockUIPreventNavigation ], // Add Block UI Route Guard
    // Add app routes
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];
```
