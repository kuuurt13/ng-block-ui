import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('block-element') elementBlockUI: NgBlockUI;
  defaultMessage: string = 'Default Message...';
  timeout: number = 2000;

  constructor(
  ) { }

  blockMain(message: string) {
    this.blockUI.start(message);

    setTimeout((blockUI) => {
      this.blockUI.stop();
    }, this.timeout);
  }

  blockElement() {
    this.elementBlockUI.start('Loading...');

    setTimeout((blockUI) => {
      this.elementBlockUI.stop();
    }, this.timeout);
  }
}
