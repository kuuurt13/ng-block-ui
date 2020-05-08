import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewEncapsulation,
  Input,
  ViewChild,
  ComponentRef,
  TemplateRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { BlockUIInstanceService } from '../../services/block-ui-instance.service';
import { BlockUIEvent } from '../../models/block-ui-event.model';
import { BlockUIActions } from '../../constants/block-ui-actions.constant';
import { BlockUIDefaultName } from '../../constants/block-ui-default-name.constant';
import { styles } from './block-ui-content.component.style';
import { template } from './block-ui-content.component.template';
import { BlockUISettings } from '../../models/block-ui-settings.model';

export type BlockState = {
  startTimeouts: Array<any>;
  stopTimeouts: Array<any>;
  updateTimeouts: Array<any>;
  blockCount: number;
  startCallCount: number;
  stopCallCount: number;
}

@Component({
  selector: 'block-ui-content',
  template: template,
  styles: [styles], // TODO: Find how to bundle styles for npm
  encapsulation: ViewEncapsulation.None
})
export class BlockUIContentComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() name: string = BlockUIDefaultName;
  @Input() delayStart: number = 0;
  @Input() delayStop: number = 0;
  @Input('message') defaultMessage: string;
  @Input('template') templateCmp: any;
  @ViewChild('templateOutlet', { read: ViewContainerRef })
  templateOutlet: ViewContainerRef;

  defaultBlockState: BlockState = {
    startTimeouts: [],
    stopTimeouts: [],
    updateTimeouts: [],
    blockCount: 0,
    startCallCount: 0,
    stopCallCount: 0
  };
  state: BlockState = { ...this.defaultBlockState };
  className: string;
  templateCompRef: ComponentRef<{ message?: any }> | TemplateRef<{}>;
  message: any;

  private blockUISubscription: Subscription;
  private settings: BlockUISettings;

  constructor(
    private blockUI: BlockUIInstanceService,
    private resolver: ComponentFactoryResolver,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.settings = this.blockUI.getSettings();
    this.blockUISubscription = this.subscribeToBlockUI(this.blockUI.observe());
  }

  ngAfterViewInit() {
    try {
      if (!this.templateCmp) {
        return false;
      }

      if (this.templateCmp instanceof TemplateRef) {
        this.templateOutlet.createEmbeddedView(this.templateCmp);
      } else {
        const templateComp = this.resolver.resolveComponentFactory(this.templateCmp);
        this.templateCompRef = this.templateOutlet.createComponent(templateComp);
        this.updateBlockTemplate(this.message);
      }
    } catch (error) {
      console.error('ng-block-ui:', error);
    }
  }

  ngAfterViewChecked() {
    this.detectChanges();
  }

  private subscribeToBlockUI(blockUI$: Observable<any>): Subscription {
    return blockUI$.subscribe(event => this.onDispatchedEvent(event));
  }

  private onDispatchedEvent(event: BlockUIEvent) {
    switch (event.action) {
      case BlockUIActions.START:
        this.onStart(event);
        break;

      case BlockUIActions.STOP:
        this.onStop(event);
        break;

      case BlockUIActions.UPDATE:
        this.onUpdate(event);
        break;

      case BlockUIActions.RESET:
        this.onReset(event);
        break;

      case BlockUIActions.RESET_GLOBAL:
        this.resetState();
        break;

      case BlockUIActions.UNSUBSCRIBE:
        this.onStop(event);
        this.onUnsubscribe(event.name);
        break;
    }
  }

  private onStart({ name, message }: BlockUIEvent) {
    if (name === this.name) {
      const delay = this.delayStart || this.settings.delayStart || 0;

      this.state.startCallCount += 1;
      const startTimeout = setTimeout(() => {
        this.state.blockCount += 1;
        this.showBlock(message);
        this.updateInstanceBlockCount();
      }, delay);
      this.state.startTimeouts.push(startTimeout);
    }
  }

  private onStop({ name }: BlockUIEvent) {
    if (name === this.name) {
      const stopCount = this.state.stopCallCount + 1;

      if (this.state.startCallCount - stopCount >= 0) {
        const delay = this.delayStop || this.settings.delayStop || 0;

        this.state.stopCallCount = stopCount;
        const stopTimeout = setTimeout(() => {
          this.state.blockCount -= 1;
          this.updateInstanceBlockCount();
          this.detectChanges();
        }, delay);
        this.state.stopTimeouts.push(stopTimeout);
      }
    }
  }

  private onUpdate({ name, message }: BlockUIEvent) {
    if (name === this.name) {
      const delay = this.delayStart || this.settings.delayStart || 0;

      clearTimeout(this.state.updateTimeouts[0]);
      const updateTimeout = setTimeout(() => {
        this.updateMessage(message);
      }, delay);
      this.state.updateTimeouts.push(updateTimeout);
    }
  }

  private onReset({ name }: BlockUIEvent) {
    if (name === this.name) {
      this.resetState();
    }
  }

  private updateMessage(message: string) {
    this.showBlock(message);
  }

  private showBlock(message: any) {
    this.message = message || this.defaultMessage || this.settings.message;
    this.updateBlockTemplate(this.message);
    this.detectChanges();
  }

  private updateBlockTemplate(msg: any): void {
    if (this.templateCompRef && this.templateCompRef instanceof ComponentRef) {
      this.templateCompRef.instance.message = msg;
    }
  }

  private resetState() {
    [
      ...this.state.startTimeouts,
      ...this.state.stopTimeouts,
      ...this.state.updateTimeouts
    ].forEach(clearTimeout);
    this.state = { ...this.defaultBlockState };
    this.updateInstanceBlockCount();
    this.detectChanges();
  }

  private onUnsubscribe(name: string) {
    if (this.blockUISubscription && name === this.name) {
      this.blockUISubscription.unsubscribe();
    }
  }

  private updateInstanceBlockCount() {
    if (this.blockUI.blockUIInstances[this.name]) {
      const { blockCount } = this.state;
      this.blockUI.blockUIInstances[this.name].blockCount = blockCount;
    }
  }

  private detectChanges() {
    if (!this.changeDetectionRef['destroyed']) {
      this.changeDetectionRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.resetState();
    this.onUnsubscribe(this.name);
    this.blockUI.clearInstance(this.name);
  }
}
