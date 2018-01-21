import {
  Directive,
  Input,
  OnInit,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  TemplateRef,
  Renderer2
} from '@angular/core';
import { BlockUIContentComponent } from '../components/block-ui-content/block-ui-content.component';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';

@Directive({ selector: '[blockUI]' })
export class BlockUIDirective implements OnInit {
  private blockUIComponentRef: ComponentRef<BlockUIContentComponent>;
  blockTarget: string;
  message: any;
  template: any;
  delayStart: any;
  delayStop: any;

  @Input()
  set blockUI(name: any) { this.blockTarget = name; };
  @Input()
  set blockUIMessage(message: any) { this.message = message; };
  @Input()
  set blockUITemplate(template: any) { this.template = template; };
  @Input()
  set blockUIDelayStart(delayStart: any) {
     this.delayStart = delayStart ? Number(delayStart) : null;
  };
  @Input()
  set blockUIDelayStop(delayStop: any) {
    this.delayStop = delayStop ? Number(delayStop) : null;
  };

  constructor(
    private viewRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    try {
      this.viewRef.createEmbeddedView(this.templateRef);
      const parentElement = this.viewRef.element.nativeElement.nextSibling;

      if (parentElement && !this.isComponentInTemplate(parentElement)) {
        this.renderer.addClass(parentElement, 'block-ui__element');

        this.blockUIComponentRef = this.createComponent();

        let blockUIContent = this.findContentNode(this.viewRef.element.nativeElement);

        if (blockUIContent) {
          parentElement.appendChild(blockUIContent);
          this.blockUIComponentRef.instance.className = 'block-ui-wrapper--element';
          this.blockUIComponentRef.instance.name = this.blockTarget || BlockUIDefaultName;
          if (this.message) this.blockUIComponentRef.instance.defaultMessage = this.message;
          if (this.template) this.blockUIComponentRef.instance.templateCmp = this.template;
          if (this.delayStart) this.blockUIComponentRef.instance.delayStart = this.delayStart;
          if (this.delayStop) this.blockUIComponentRef.instance.delayStop = this.delayStop;
        }
      }
    } catch (error) {
      console.error('ng-block-ui:', error);
    }
  }


  private isComponentInTemplate(element: any): boolean {
    let { children } = element || [];
    children = Array.from(children).reverse();
    return children.some((el: any) => el.localName === 'block-ui');
  }

  // Needed for IE (#17)
  private findContentNode(element: any) {
    const { nextSibling } = element;
    return [nextSibling, nextSibling.nextSibling].find((e) => e.localName === 'block-ui-content');
  }

  private createComponent() {
    const resolvedBlockUIComponent = this.componentFactoryResolver.resolveComponentFactory(BlockUIContentComponent);
    return this.viewRef.createComponent(resolvedBlockUIComponent);
  }
}
