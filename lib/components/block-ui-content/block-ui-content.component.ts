import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Input
} from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BlockUIInstanceService } from '../../services/block-ui-instance.service';
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
  @Input('message') defaultMessage: string;

  active: boolean = false;

  private message: string;
  private blockUISubscription: Subscription;

  constructor(
    private blockUI: BlockUIInstanceService
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
      case(BlockUIActions.UPDATE):
        this.onStart(event);
        break;

      case(BlockUIActions.STOP):
      case(BlockUIActions.RESET):
        this.onStop(event);
        break;

      case(BlockUIActions.UNSUBSCRIBE):
        this.onStop(event);
        this.onUnsubscribe(event.name);
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
    const { name, action } = event;

    if (name === this.name || action === BlockUIActions.RESET) {
      this.active = false;
    }
  }

  private onUnsubscribe(name: string) {
    if (name === this.name) {
      this.blockUISubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.onUnsubscribe(this.name);
  }
}
