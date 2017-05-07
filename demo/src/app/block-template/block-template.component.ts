import { Component } from '@angular/core';


@Component({
  styles: [`
    :host {
      color: #fff;
    }
  `],
  template: `
    <div class="block-ui-template">
      <div>{{message}}</div>
      <div>Custom Template</div>
    </div>
  `,
})
export class BlockTemplateComponent {
  constructor() {}
}
