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
export class BlockUIContentComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() name: string = BlockUIDefaultName;
  @Input('message') defaultMessage: string;
  @Input('template') templateCmp: any;
  @ViewChild('templateOutlet', { read: ViewContainerRef })
  templateOutlet: ViewContainerRef;

  className: string;
  active: boolean = false;
  templateCompRef: ComponentRef<{ message?: any }> | TemplateRef<{}>;


  private message: string;
  private blockUISubscription: Subscription;

  constructor(
    private blockUI: BlockUIInstanceService,
    private resolver: ComponentFactoryResolver,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
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
      .map(event => this.onDispatchedEvent(event))
      .subscribe();
  }

  private onDispatchedEvent(event: BlockUIEvent) {
    switch (event.action) {
      case (BlockUIActions.START):
      case (BlockUIActions.UPDATE):
        this.onStart(event);
        break;

      case (BlockUIActions.STOP):
      case (BlockUIActions.RESET):
        this.onStop(event);
        break;

      case (BlockUIActions.UNSUBSCRIBE):
        this.onStop(event);
        this.onUnsubscribe(event.name);
        break;
    }
  }

  private onStart(event: BlockUIEvent) {
    if (event.name === this.name) {
      this.active = true;
      this.message = event.message;
      this.updateBlockTemplate(event.message);
    }
  }

  private onStop(event: BlockUIEvent) {
    const { name, action } = event;

    if (name === this.name || action === BlockUIActions.RESET) {
      this.active = false;
    }
  }

  private updateBlockTemplate(msg: string = this.defaultMessage): void {
    if (this.templateCompRef && this.templateCompRef instanceof ComponentRef) {
      this.templateCompRef.instance.message = msg;
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
