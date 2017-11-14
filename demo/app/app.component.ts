import { Component, ComponentRef } from '@angular/core';
import { BlockUI, NgBlockUI, BlockUIService } from 'ng-block-ui';

import { BlockTemplateComponent } from './block-template/block-template.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  moduleId: __moduleName
})
export class AppComponent {
  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('block-element') elementBlockUI: NgBlockUI;

  defaultMessage: string = 'Default Message...';
  timeout: number = 2000;
  blockInstances = ['block-element', 'block-element-2', 'block-element-3'];
  blockTemplate: BlockTemplateComponent = BlockTemplateComponent;

  constructor(
    private blockUIService: BlockUIService
  ) {}

  blockMain(message: string) {
    this.blockUI.start(message);

    setTimeout((blockUI) => {
      this.blockUI.stop();
    }, this.timeout);
  }

  blockElement() {
    this.elementBlockUI.start();

    setTimeout((blockUI) => {
      this.elementBlockUI.stop();
    }, this.timeout);
  }

  blockAllElements() {
    this.blockUIService.start(this.blockInstances, 'Loading All');

    setTimeout((blockUI) => {
      this.blockUIService.stop(this.blockInstances);
    }, this.timeout);
  }

  blockUpdate() {
    let messages: string[] = ['Logining In', 'Loading Settings', 'Loading Widgets'],
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
}
