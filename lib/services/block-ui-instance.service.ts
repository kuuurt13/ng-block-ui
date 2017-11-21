import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';
import { NgBlockUI } from '../models/block-ui.model';
import { BlockUISettings } from '../models/block-ui-settings.model';
import { BlockUIEvent } from '../models/block-ui-event.model';
import { BlockUIService } from '../../index';


@Injectable()
export class BlockUIInstanceService {
  blockUISettings: BlockUISettings | any = {};
  blockUIInstances: NgBlockUI[] = [];
  private blockUISubject: ReplaySubject<any> = new ReplaySubject();
  private blockUIObservable: Observable<any> = this.blockUISubject.asObservable();

  constructor() {
    this.blockUIObservable.subscribe(this.blockUIMiddleware.bind(this));
  }

  getSettings(): BlockUISettings | any {
    return this.blockUISettings;
  }

  updateSettings(settings: BlockUISettings | any = {}): void {
    this.blockUISettings = { ...this.blockUISettings, ...settings };
  }

  decorate(name: string = BlockUIDefaultName): NgBlockUI {
    const blockUI = {
      name,
      isActive: false,
      start: this.dispatch(this.blockUISubject, BlockUIActions.START, name),
      update: this.dispatch(this.blockUISubject, BlockUIActions.UPDATE, name),
      stop: this.dispatch(this.blockUISubject, BlockUIActions.STOP, name),
      reset: this.dispatch(this.blockUISubject, BlockUIActions.RESET, name),
      unsubscribe: this.dispatch(this.blockUISubject, BlockUIActions.UNSUBSCRIBE, name)
    } as NgBlockUI;

    this.blockUIInstances.push(blockUI);

    return blockUI;
  }

  observe(): Observable<any> {
    return this.blockUIObservable;
  }

  private blockUIMiddleware({ action, name }: BlockUIEvent): void {
    let isActive = null;

    switch (action) {
      case (BlockUIActions.START):
        isActive = true;
        break;

      case (BlockUIActions.STOP):
      case (BlockUIActions.RESET):
        isActive = false;
        break;
    }

    if (isActive !== null) {
      this.blockUIInstances.forEach(i =>
        i.isActive = i.name === name ? isActive : i.isActive
      );
    }
  }

  private dispatch(subject: ReplaySubject<any>, action: BlockUIActions, name: string = BlockUIDefaultName): Function {
    return (message?: any): void => {
      subject.next({
        name,
        action,
        message
      });
    };
  }
}
