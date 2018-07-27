import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  // Wires up BlockUI instance for hero-section directive
  @BlockUI('hero-section') blockUI: NgBlockUI;

  constructor() {}

  toggleBlocking(message?: string) {
    this.blockUI.start(message);

    setTimeout(() => {
      this.blockUI.stop();
    }, 2500);
  }

}
