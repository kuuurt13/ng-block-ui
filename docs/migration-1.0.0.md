# Migrating to NG Block UI 1.0.0
With the 1.0.0 release, settings can now be set on a module level and all components and directives will inherit these settings.

To allow for these changes the `BlockUIModule` module now needs to be imported by invoking the `forRoot` method instead of the module itself. Even if settings are not being set the `forRoot` method must be invoked for the module to be imported correctly.

### Old Module Import

```ts
@NgModule({
  imports: [
    BlockUIModule
  ]
})
export class AppModule {}
```

### New 1.0 Module Import
```ts
@NgModule({
  imports: [
    // Settings can be passed to forRoot
    BlockUIModule.forRoot()
  ]
})
export class AppModule {}
```
