import { Component } from '@angular/core';
import { BlockUI, NgBlockUI, BlockUIService } from 'ng-block-ui';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  moduleId: __moduleName
})
export class DefaultComponent {
  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('block-element') elementBlockUI: NgBlockUI;

  defaultMessage: string = 'Default Message...';
  timeout: number = 2000;
  blockInstances = ['block-element', 'block-element-2', 'block-element-3'];

  constructor(
    private blockUIService: BlockUIService
  ) { }

  blockMain(message: string) {
    this.blockUI.start(message);

    setTimeout(() => {
      this.blockUI.stop();
    }, this.timeout);
  }

  blockElement() {
    this.elementBlockUI.start();

    setTimeout(() => {
      this.elementBlockUI.stop();
    }, this.timeout);
  }

  blockAllElements() {
    this.blockUIService.start(this.blockInstances, 'Loading All');

    setTimeout(() => {
      this.blockUIService.update(this.blockInstances, 'Update Message');
    }, this.timeout / 2);

    setTimeout(() => {
      this.blockUIService.stop(this.blockInstances);
    }, this.timeout);
  }

  blockUpdate() {
    let messages: string[] = ['Logging In', 'Loading Settings', 'Loading Widgets'],
      i = 0,
      interval: any;

    this.elementBlockUI.start('Welcome');

    interval = setInterval(() => {
      this.elementBlockUI.update(messages[i]);
      i++;

      if (i > messages.length) {
        this.elementBlockUI.stop();
        clearInterval(interval);
      }
    }, 850);
  }

  blockNestedTimeout() {
    this.blockUI.start("foo");

    setTimeout(() => {
      this.blockUI.stop();
      this.blockUI.start("bar");

      setTimeout(() => {
        this.blockUI.stop();
      }, 2500);
    }, 2500);
  }
}
