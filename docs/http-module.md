# Router Module

## Automatically Block HTTP Requests
This module allows for blocking automatically during all HTTP requests made with the `HttpClient`

### Setup
The core `BlockUIModule` should first be imported within the app. Once added, a seperate module called `BlockUIHttpModule` should then be imported to allow for HTTP blocking.

```ts
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

@NgModule({
  imports: [
    HttpClientModule, // Import Http Client
    BlockUIModule.forRoot(), // Import BlockUIModule
    BlockUIHttpModule.forRoot(), // Import Block UI Http Module
  ],
  ...
})
export class AppModule {}
```

### Setting: `requestFilters`
Accepts an array of requests to be filtered out from from being blocked.

**Types**
```
requestFilters: (RegExp | { method: string, url: RegExp } | Function)[]
```

#### Type: `RegExp`
Filter requests by URL

Below will filter out blocking for any requests containing `api.github.com/users/` in the URL.

```ts
@NgModule({
  imports: [
    ...
    BlockUIHttpModule.forRoot({
      /api.github.com\/users\//
    }),
  ],
  ...
})
export class AppModule {}
```

#### Type: `{ method: string, url: RegExp }`
Filter requests by http method and URL

Below will filter out blocking for any requests with a `POST` method and a URL containing `api.github.com/users/`

```ts
@NgModule({
  imports: [
    ...
    BlockUIHttpModule.forRoot({
      {
        method: 'POST',
        url: /api.github.com\/users\//
      }
    }),
  ],
  ...
})
export class AppModule {}
```

#### Type: `Function`
Filter requests by passing a function. The function will be passed the current request and if `true` is returned the request will not be blocked.

Below will filter out all requests with a query paramater of `foo=bar`.

```ts
function filterFooBar(req HttpRequest<any>): boolean {
  return req.params.get('foo') === 'bar';
}

@NgModule({
  imports: [
    ...
    BlockUIHttpModule.forRoot({
      requestFilters: [ filterFooBar ]
    }),
  ],
  ...
})
export class AppModule {}
```
