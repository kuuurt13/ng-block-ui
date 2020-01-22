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
  start(target: string | string[], message?: any): void {
    this.dispatch(target, BlockUIActions.START, message);
  }

  /**
  * Stops blocking for given BlockUI instance or instances
  */
  stop(target: string | string[]): void {
    this.dispatch(target, BlockUIActions.STOP);
  }

  /**
  * Reset blocking for given BlockUI instance or instances
  */
  reset(target: string | string[]): void {
    this.dispatch(target, BlockUIActions.RESET);
  }

  /**
  * Updates message for given BlockUI instance or instances
  */
  update(target: string | string[], message: any): void {
    this.dispatch(target, BlockUIActions.UPDATE, message);
  }

  /**
  * Unsubscribes for given BlockUI instance or instances
  */
  unsubscribe(target: string | string[]): void {
    this.dispatch(target, BlockUIActions.UNSUBSCRIBE);
  }

  /**
  * Checks if BlockUI is actively blocking
  */
  isActive(target: string | string[] = null): boolean {
    const targets = target ? this.toArray(target) : null;
    const instances = this.blockUIInstance.blockUIInstances;

    return Object.keys(instances).some((key: string) => {
      if (!targets) {
        return instances[key].isActive;
      }

      return targets.indexOf(instances[key].name) >= 0 && instances[key].isActive;
    });
  }

  private dispatch(target: string | string[] = [], type: string, message?: any) {
    const instances = this.toArray(target);
    instances.forEach(i => this.blockUIInstance.decorate(i)[type](message));
  }

  private toArray(target: string | string[] = []) {
    return typeof target === 'string' ? [target] : target;
  }
}
