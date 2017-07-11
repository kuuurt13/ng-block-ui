import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlockUIModule } from '../block-ui.module';
import { BlockUI } from '../decorators/block-ui.decorator';
import { BlockUIContentComponent } from '../components/block-ui-content/block-ui-content.component';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';

@Component({
  selector: 'test-comp',
  template: `
    <template class="ref-template" #templateTest>
      <div class="test-template">Test</div>
    </template>
    <div class="host-element" *blockUI="'element'; message: 'default'; template: templateTest">
        <h1 class="header">Test</h1>
    </div>
  `
})
class TestComp {
  @BlockUI('element') blockUI: any;
  blockName: string;
}

describe(`block-ui element directive`, () => {
  let cf: ComponentFixture<any>;
  let blkContComp: DebugElement;
  let blockContentElement: HTMLElement;
  let testCmp: TestComp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BlockUIModule ],
      declarations: [ TestComp ]
    })
      .compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    testCmp = cf.debugElement.componentInstance;
  });

  it(`appends block-ui-content`, () => {
    blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
    blockContentElement = blkContComp.nativeElement;
    expect(blockContentElement).toBeDefined();
  });

  it(`adds 'block-ui-wrapper--element' to block-ui-content`, () => {
    let blkContComp = cf.debugElement.query(By.css('block-ui-content.block-ui-wrapper--element'));
    expect(blkContComp).toBeDefined();
  });

  it(`adds 'block-ui__element' class to host element`, () => {
    let hostElement = cf.debugElement.query(By.css('host-element.block-ui__element'));
    expect(hostElement).toBeDefined();
  });

  it(`projects transcluded elements`, () => {
    let { nativeElement } = cf.debugElement.query(By.css('h1.header'));
    expect(nativeElement).not.toBe(null);
  });

  it(`passes name property to block-ui-content`, () => {
    let name = 'test-name';
    let { componentInstance } = blkContComp;

    componentInstance.name = name;
    cf.detectChanges();

    expect(componentInstance.name).toBe(name);
  });

  it(`passes default message property to block-ui-content`, () => {
    let expectedMessage = 'default';
    let { componentInstance } = blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));

    expect(componentInstance.defaultMessage).toBe(expectedMessage);
  });

  it(`passes custom template to block-ui-content`, () => {
    testCmp.blockUI.start();
    cf.detectChanges();

    const template = cf.debugElement.query(By.css('.test-template'));
    expect(template).not.toBe(null);
  });
});
