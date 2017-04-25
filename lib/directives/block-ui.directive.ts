import {
  Directive,
  Input,
  OnInit,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  TemplateRef
} from '@angular/core';
import { BlockUIContentComponent } from '../components/block-ui-content/block-ui-content.component';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';

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
      const parentElement = this.viewRef.element.nativeElement.nextSibling;

      if (parentElement && !this.isComponentInTemplate(parentElement)) {
        parentElement.classList.add('block-ui__element');

        this.blockUIComponentRef = this.createComponent();

        let blockUIContent = this.findContentNode(this.viewRef.element.nativeElement);
        if (blockUIContent) {
          parentElement.appendChild(blockUIContent);
          this.blockUIComponentRef.instance.name = this.blockTarget || BlockUIDefaultName;
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
