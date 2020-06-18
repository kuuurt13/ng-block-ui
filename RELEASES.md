# 3.0.0 Release

## Highlights

- Added Angular 9 and Ivy support
- Rewrote block queueing to fix various bugs
- Added new minor features

## Features/Major Changes

### Angular 9 & Ivy Support

This release now officially supports Angular 9 and the Ivy renderer.

### Rewrite of Block Queueing

There has been a lot of changes to block queueing to fix various one off issues and it has become very fractured in its approach. This release refactors some of these efforts in a more cohesive way.

### Added new "scopeToInstance" setting

One issue that people run into when they make a component that uses the Block UI decorator is that they expect the Block UI instance to be scoped to the component instance it was declared in. Then if they run `start` in that component it will only start blocking for the given component instance but that is actually not the case. See a common example below.

#### Example:

_Parent Component:_

```ts
@Component({
  selector: "parent-cmp",
  template: `
    <div>
      <custom-table [block]="false"></custom-table>
      <custom-table [block]="true"></custom-table>
    </div>
  `,
})
export class ParentCmp {}
```

_Child Component:_

```ts
@Component({
  selector: "custom-table",
  template: `<table *blockUI="'table-block'"></table>`,
})
export class CustomTableCmp implements OnInit {
  @Input() block: boolean;
  @BlockUI("table-block") blockUITable: NgBlockUI;

  ngOnInit() {
    // Only block when true
    if (block) {
      this.blockUITable.start();
    }
  }
}
```

In the above example, both tables would be blocked instead of just the second table. This is because they both are being targeted with the same `table-block` name which is not unique across instances. It is possible to get around this limitation but it required adding extra code.

To make this easier, you can now set the `scopeToInstance` to be `true` and it will create a unique name that can be passed to the `*blockUI` directive or `block-ui` component. This will allow you to only target the Block UI instance for the given component instance. See the updated example below and also issues [#123](https://github.com/kuuurt13/ng-block-ui/issues/123) and [#127](https://github.com/kuuurt13/ng-block-ui/issues/127) for more info.

_Updated Child Component:_

```ts
@Component({
  selector: "custom-table",
  template: `<table *blockUI="blockUITable.name"></table>`, // Pass the name so it can be targeted
})
export class CustomTableCmp implements OnInit {
  @Input() block: boolean;
  // Add new "scopeToInstance" setting
  @BlockUI("table-block", { scopeToInstance: true }) blockUITable: NgBlockUI;

  ngOnInit() {
    if (block) {
      // Will only start blocking for this component instance
      this.blockUITable.start();
    }
  }
}
```

## Breaking Changes

### HTTP "blockAllRequestsInProgress" default

Moving forward the HTTP `blockAllRequestsInProgress` module setting will be [defaulted to true](./docs/http-module.md#setting-blockallrequestsinprogress). Automatic HTTP blocking will now wait for all pending HTTP calls by default. This was always the intended behavior but there was a bug that prevented it from working properly so this setting was used for people to opt in for the correct behavior to avoid breaking current functionality for some users. See issue [#126](https://github.com/kuuurt13/ng-block-ui/issues/126) for more info.

### Reset only targets given instance

A bug was introduced that when `reset` was called it would reset (stop) all current active blocking instances (see below example). This has been fixed so when `reset` is called for a targeted Block UI instance it will only reset for that target instance and not all others. Since the old functionality might still be useful the [resetGlobal](./README.md#ngblockui-instance) method was introduced that will reset blocking for all Block UI instances.

```ts
export class AppComponent {
  @BlockUI("sectionOne") blockUISectionOne: NgBlockUI;
  @BlockUI("sectionTwo") blockUISectionTwo: NgBlockUI;

  constructor() {
    this.blockUISectionOne.start(); // Starts blocking for sectionOne
    this.blockUISectionTwo.start(); // Starts blocking for sectionTwo

    // BUG: Resets (stops) blocking for both sectionOne & sectionTwo
    // Should only reset blocking for blockUISectionOne and not blockUISectionTwo
    this.blockUISectionOne.reset();
  }
}
```
