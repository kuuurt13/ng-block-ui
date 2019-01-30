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

  state: any = { startTimeout: null, stopTimeout: null, blockCount: 0 };
  className: string;
  active: boolean = false;
  templateCompRef: ComponentRef<{ message?: any }> | TemplateRef<{}>;
  message: any;

  private blockUISubscription: Subscription;
  private settings: BlockUISettings;

  constructor(
    private blockUI: BlockUIInstanceService,
    private resolver: ComponentFactoryResolver,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

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
    this.changeDetectionRef.detectChanges();
  }

  private subscribeToBlockUI(blockUI$: Observable<any>): Subscription {
    return blockUI$
      .subscribe(event => this.onDispatchedEvent(event));
  }

  private onDispatchedEvent(event: BlockUIEvent) {
    switch (event.action) {
      case (BlockUIActions.START):
        this.onStart(event);
        break;

      case (BlockUIActions.STOP):
        this.onStop(event);
        break;

      case (BlockUIActions.UPDATE):
        this.onUpdate(event);
        break;

      case (BlockUIActions.RESET):
        this.onReset();
        break;

      case (BlockUIActions.UNSUBSCRIBE):
        this.onStop(event);
        this.onUnsubscribe(event.name);
        break;
    }
  }

  private onStart({ name, message }: BlockUIEvent) {
    if (name === this.name) {
      const delay = this.delayStart || this.settings.delayStart || 0;

      if (delay) {
        if (this.state.startTimeout === null) {
          this.state.startTimeout = setTimeout(() => {
            this.showBlock(message);
          }, delay);
        }
        this.state.blockCount++;
      } else {
        this.showBlock(message);
      }

      this.updateInstanceBlockCount();
    }
  }

  private onStop({ name, action }: BlockUIEvent) {
    if (name === this.name) {
      if (this.state.blockCount > 1) {
        this.state.blockCount--;
      } else {
        if (!this.active) {
          this.clearState();
        } else {
          const delay = this.delayStop || this.settings.delayStop || 0;
          if (delay) {
            if (this.state.stopTimeout === null) {
              this.state.stopTimeout = setTimeout(() => {
                this.hideBlock();
              }, delay);
            }
          } else {
            this.hideBlock();
          }
        }
      }

      this.updateInstanceBlockCount();
    }
  }

  private onReset() {
    this.hideBlock();
  }

  private onUpdate({ name, message }: BlockUIEvent) {
    if (name === this.name) {
      this.active = true;
      this.message = message || this.defaultMessage || this.settings.message;
      this.updateBlockTemplate(this.message);
      this.changeDetectionRef.detectChanges();
    }
  }

  private showBlock(message: any) {
    this.active = true;
    this.message = message || this.defaultMessage || this.settings.message;
    this.updateBlockTemplate(this.message);
    this.changeDetectionRef.detectChanges();
  }

  private hideBlock() {
    this.clearState();
    this.active = false;
    this.changeDetectionRef.detectChanges();
  }

  private clearState() {
    this.state.startTimeout != null && clearTimeout(this.state.startTimeout);
    this.state.stopTimeout != null && clearTimeout(this.state.stopTimeout);
    this.state.blockCount = 0;
    this.state.startTimeout = null;
    this.state.stopTimeout = null;
    this.updateInstanceBlockCount();
  }

  private updateBlockTemplate(msg: any): void {
    if (this.templateCompRef && this.templateCompRef instanceof ComponentRef) {
      this.templateCompRef.instance.message = msg;
    }
  }

  private onUnsubscribe(name: string) {
    if (this.blockUISubscription && name === this.name) {
      this.blockUISubscription.unsubscribe();
    }
  }

  private updateInstanceBlockCount() {
    if (this.blockUI.blockUIInstances[this.name]) {
      this.blockUI.blockUIInstances[this.name].blockCount = this.state.blockCount;
    }
  }

  ngOnDestroy() {
    this.onUnsubscribe(this.name);
  }
}
