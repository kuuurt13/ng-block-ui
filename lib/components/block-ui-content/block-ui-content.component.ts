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
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BlockUIInstanceService } from '../../services/block-ui-instance.service';
import { BlockUIEvent } from '../../models/block-ui-event.model';
import { BlockTimeout } from '../../models/block-ui-block-timeout.model';
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

  timeouts: any = { delayStart: null, delayStop: null };
  className: string;
  active: boolean = false;
  templateCompRef: ComponentRef<{ message?: any }> | TemplateRef<{}>;


  private message: any;
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
      if (this.templateCmp) {
        if (this.templateCmp instanceof TemplateRef) {
          this.templateOutlet.createEmbeddedView(this.templateCmp);
        } else {
            const templateComp = this.resolver.resolveComponentFactory(this.templateCmp);
            this.templateCompRef = this.templateOutlet.createComponent(templateComp);

            this.updateBlockTemplate(this.message);
        }
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
        this.delay('delayStart', this.delayStart, event)(
          this.onStart.bind(this)
        );
        break;

      case (BlockUIActions.STOP):
        this.delay('delayStop', this.delayStop, event)(
          this.onStop.bind(this)
        );
        break;

      case (BlockUIActions.UPDATE):
        this.onUpdate(event);
        break;

      case (BlockUIActions.RESET):
        this.onStop(event);
        break;

      case (BlockUIActions.UNSUBSCRIBE):
        this.onStop(event);
        this.onUnsubscribe(event.name);
        break;
    }
  }

  private onStart({ name, message }: BlockUIEvent) {
    if (name === this.name) {
      this.active = true;
      this.message = message || this.defaultMessage || this.settings.message;
      this.updateBlockTemplate(this.message);
      this.changeDetectionRef.detectChanges();
    }
  }

  private onStop({ name, action }: BlockUIEvent) {
    const { delayStart } = this.timeouts;

    if (name === this.name || action === BlockUIActions.RESET) {
      delayStart && clearTimeout(delayStart);
      this.active = false;
      this.changeDetectionRef.detectChanges();
    }
  }

  private onUpdate({ name, message }: BlockUIEvent) {
    if (name === this.name) {
      this.active = true;
      this.message = message || this.defaultMessage || this.settings.message;
      this.updateBlockTemplate(this.message);
      this.changeDetectionRef.detectChanges();
    }
  }

  private updateBlockTemplate(msg: string): void {
    if (this.templateCompRef && this.templateCompRef instanceof ComponentRef) {
      this.templateCompRef.instance.message = msg;
    }
  }

  private onUnsubscribe(name: string) {
    if (name === this.name) {
      this.blockUISubscription.unsubscribe();
    }
  }

  private delay(type: string, delay: number, event: BlockUIEvent) {
    return (action: Function) => {
      delay = delay || this.settings[type] || 0;

      if (delay) {
        this.timeouts[type] = setTimeout(event => {
          action(event);
        }, delay, event);
      } else {
        action(event);
      }
    };
  }

  ngOnDestroy() {
    this.onUnsubscribe(this.name);
  }
}
