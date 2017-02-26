import {
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { BlockUIDefaultName } from '../../constants';

@Component({
  selector: 'block-ui',
  template: `
    <ng-content></ng-content>
    <block-ui-content [name]="name"></block-ui-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class BlockUIComponent {
  @Input() name: string = BlockUIDefaultName;

  constructor() { }
}
