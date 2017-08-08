import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  ComponentRef
} from '@angular/core';
import { BlockUIDefaultName } from '../../constants/block-ui-default-name.constant';

@Component({
  selector: 'block-ui',
  template: `
    <ng-content></ng-content>
    <block-ui-content
      [name]="name"
      [message]="message"
      [template]="template"
      [delayStart]="delayStart"
      [delayStop]="delayStop"
    >
    </block-ui-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class BlockUIComponent implements OnInit {
  @Input() name: string;
  @Input() message: any;
  @Input() delayStart: number;
  @Input() delayStop: number;
  @Input() template: any;

  constructor() { }

  ngOnInit() {
    this.name = this.name || BlockUIDefaultName;
  }
}
