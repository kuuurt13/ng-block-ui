import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit
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
export class BlockUIComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() {
    this.name = this.name || BlockUIDefaultName;
  }
}
