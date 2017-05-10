import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlockUIModule } from '../block-ui.module';
import { BlockUIContentComponent } from '../components/block-ui-content/block-ui-content.component';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';

@Component({
  selector: 'test-comp',
  template: `
    <div class="host-element" *blockUI="'element'">
        <h1 class="header">Test</h1>
    </div>
  `
})
class TestComp {
  blockName: string;
}

describe(`block-ui element directive`, () => {
  let cf: ComponentFixture<any>;
  let blkContComp: DebugElement;
  let blockContentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlockUIModule],
      declarations: [TestComp]
    })
      .compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();
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
    let instance = blkContComp.componentInstance;
    let name = 'test-name';
    let { componentInstance } = blkContComp;

    instance.name = name;
    cf.detectChanges();

    expect(componentInstance.name).toBe(name);
  });
});
