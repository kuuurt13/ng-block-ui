import {
  Directive,
  Input,
  OnInit,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  TemplateRef
} from '@angular/core';
import { BlockUIContentComponent } from '../components';
import { BlockUIDefaultName } from '../constants';

@Directive({ selector: '[blockUI]' })
export class BlockUIDirective implements OnInit {
  private blockTarget: string;
  private blockUIComponentRef: ComponentRef<BlockUIContentComponent>;

  @Input()
  set blockUI(name) { this.blockTarget = name; };

  constructor(
    private viewRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    try {
      this.viewRef.createEmbeddedView(this.templateRef);

      const parentElement = this.viewRef.element.nativeElement.nextElementSibling;
      parentElement.className += ' block-ui__element';

      if (!this.isComponentInTemplate(parentElement)) {
        this.blockUIComponentRef = this.createComponent();
        parentElement.append(this.viewRef.element.nativeElement.nextSibling);
        this.blockUIComponentRef.instance.name = this.blockTarget || BlockUIDefaultName;
      }
    } catch (error) {
      console.error('ng-block-ui:', error);
    }
  }

  private isComponentInTemplate(element: any): boolean {
    let { children } = element;
    children = Array.from(children).reverse();
    return children.some((el: any) => el.localName === 'block-ui');
  }

  private createComponent() {
    const resolvedBlockUIComponent = this.componentFactoryResolver.resolveComponentFactory(BlockUIContentComponent);
    return this.viewRef.createComponent(resolvedBlockUIComponent, 0);
  }
}
