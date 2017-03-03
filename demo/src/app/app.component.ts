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

  constructor(
  ) { }

  blockMain() {
    this.blockUI.start();

    setTimeout((blockUI) => {
      this.blockUI.stop();
    }, 2000);
  }

  blockElement() {
    this.elementBlockUI.start('Loading...');

    setTimeout((blockUI) => {
      this.elementBlockUI.stop();
    }, 2000);
  }
}
