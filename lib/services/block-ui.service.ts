import { Injectable } from '@angular/core';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';
import { BlockUIInstanceService } from './block-ui-instance.service';


@Injectable()
export class BlockUIService {

  constructor(
    private blockUIInstance: BlockUIInstanceService
  ) {}

  /**
  * Starts blocking for given BlockUI instance or instances
  */
  start(target: string | string[], message?: string): void {
    this.dispatch(target, BlockUIActions.START, message);
  }

  /**
  * Stops blocking for given BlockUI instance or instances
  */
  stop(target: string | string[]): void {
    this.dispatch(target, BlockUIActions.STOP);
  }

  /**
  * Unsubscribes for given BlockUI instance or instances
  */
  unsubscribe(target: string | string[]): void {
    this.dispatch(target, BlockUIActions.UNSUBSCRIBE);
  }

  private dispatch(target: string | string[] = [], type: string, message?: string) {
    const instances = typeof target === 'string' ? [target] : target;
    instances.forEach(i => this.blockUIInstance.decorate(i)[type](message));
  }
}
