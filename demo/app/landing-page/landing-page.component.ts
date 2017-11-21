import { Component, ComponentRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockUI, NgBlockUI, BlockUIService } from 'ng-block-ui';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  moduleId: __moduleName
})
export class LandingPageComponent {
  @BlockUI() blockUI: NgBlockUI;
  user: any = null;
  private timeout: number = 8000;
  private url: string = 'https://api.github.com/users/kuuurt13';

  constructor(public http: HttpClient) {}

  public getUser() {
    this.http.get(this.url)
      .subscribe(
        data => this.user = data,
        err => console.log(err)
      );
  }

  blockMain() {
    this.blockUI.start('Try To Navigate Back');

    setTimeout((blockUI) => {
      this.blockUI.stop();
    }, this.timeout);
  }
}
