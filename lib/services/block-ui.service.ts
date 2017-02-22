import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { BlockUIActions, BlockUIDefaultName } from '../constants';
import { BlockUI } from '../models';


@Injectable()
export class BlockUIService {
  private blockUISubject: ReplaySubject<any> = new ReplaySubject();
  private blockUIObservable: Observable<any> = this.blockUISubject.asObservable();

  constructor() { }

  decorate(name: string = BlockUIDefaultName): BlockUI {
    return {
      start: this.dispatch(this.blockUISubject, BlockUIActions.START, name),
      stop: this.dispatch(this.blockUISubject, BlockUIActions.STOP, name),
      reset: this.dispatch(this.blockUISubject, BlockUIActions.RESET, name),
    }
  }

  observe(): Observable<any> {
    return this.blockUIObservable;
  }

  private dispatch(blockUISubject: ReplaySubject<any>, action: BlockUIActions, name?: string): Function {
    return (message?: string): void => {
      blockUISubject.next({
        name,
        action,
        message
      });
    }
  }
}
