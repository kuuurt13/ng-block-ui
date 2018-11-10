# Migrating to NG Block UI 2.0.0

## Requires Angular and RxJS 6
To use `2.0.0` you will need to upgrade Angular and RxJS to `6.x.x`.

## Changes to start/stop behavior
When migrating to `2.0.0` be aware that call queueing has been added to all blocking calls so that the number of calls to `start/stop` are tracked. Below is an overview of the change in behavior.

### Current Behavior:
In the example below blocking would be stopped even though the same instance has had `start` called multiple times. The issue with this is that if the user wants to start blocking from multiple services and does not want the blocking to stop when one of the services resolve they would have to keep track of all services and then call stop when everything resolves. Calling multiple services can happen frequently in apps so the burden of accounting for this shouldn’t be on the user of the library.

#### Example
```ts
this.blockUI.start()
this.blockUI.start()
this.blockUI.stop()
```

### New Behavior:
Calls are now queued so the previous example would result in blocking still being shown until `stop` has been called a second time. To clear the call queue when there are multiple blocking calls, the `reset` method could still be called to achieve the same behavior as before.

#### Example
```ts
this.blockUI.start()
this.blockUI.start()
this.blockUI.reset()
```
