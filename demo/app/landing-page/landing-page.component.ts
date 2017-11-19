import { Component, ComponentRef } from '@angular/core';
import { BlockUI, NgBlockUI, BlockUIService } from 'ng-block-ui';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  moduleId: __moduleName
})
export class LandingPageComponent {
  @BlockUI() blockUI: NgBlockUI;

  timeout: number = 8000;

  blockMain() {
    this.blockUI.start('Try To Navigate Back');

    setTimeout((blockUI) => {
      this.blockUI.stop();
    }, this.timeout);
  }
}
