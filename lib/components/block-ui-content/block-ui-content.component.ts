import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { BlockUIService } from '../../services/block-ui.service';
import { BlockUIEvent } from '../../models/block-ui-action.model';
import { BlockUIActions } from '../../constants/block-ui-actions.constant';
import { BlockUIDefaultName } from '../../constants/block-ui-default-name.constant';
import { styles } from './block-ui-content.component.style';
import { template } from './block-ui-content.component.template';

@Component({
  selector: 'block-ui-content',
  template: template,
  styles: [styles], // TODO: Find how to bundle styles for npm
  encapsulation: ViewEncapsulation.None
})
export class BlockUIContentComponent implements OnInit, OnDestroy {
  @Input() name: string = BlockUIDefaultName;
  private message: string;
  private active: boolean = false;
  private blockUISubscription: Subscription;

  constructor(
    private blockUI: BlockUIService
  ) { }

  ngOnInit() {
    this.blockUISubscription = this.subscribeToBlockUI(this.blockUI.observe());
  }

  private subscribeToBlockUI(blockUI$: Observable<any>): Subscription {
    return blockUI$
      .map(event => this.onDispatchedEvent(event))
      .subscribe();
  }

  private onDispatchedEvent(event: BlockUIEvent) {
    switch (event.action) {
      case(BlockUIActions.START):
        this.onStart(event);
        break;

      case(BlockUIActions.STOP):
      case(BlockUIActions.RESET):
        this.onStop(event);
        break;
    }
  }

  private onStart(event: BlockUIEvent) {
    if (event.name === this.name) {
      this.active = true;
      this.message = event.message;
    }
  }

  private onStop(event: BlockUIEvent) {
    if (event.name === this.name || event.action === BlockUIActions.RESET) {
      this.active = false;
    }
  }

  ngOnDestroy() {
    this.blockUISubscription.unsubscribe();
  }
}
