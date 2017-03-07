import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlockUIModule } from '../../block-ui.module';
import { BlockUIContentComponent } from '../block-ui-content/block-ui-content.component';
import { BlockUIDefaultName } from '../../constants/block-ui-default-name.constant';

@Component({
  selector: 'test-comp',
  template: `
    <block-ui>
      <h1>Test</h1>
    </block-ui>
  `
})
class TestComp {
  blockName: string;
}

describe('BlockUI Component', () => {
  let cf: ComponentFixture<any>;
  let blkContComp: DebugElement;
  let blockContentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BlockUIModule ],
      declarations: [
        TestComp
      ]
    })
    .compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
    blockContentElement = blkContComp.nativeElement;
  });

  it('Appends BlockUIContentComponent', () => {
    expect(blockContentElement).toBeDefined();
  });

  it('Sets BlockUIContentComponent to default name', () => {
    let instance = blkContComp.componentInstance;
    expect(instance.name).toBe(BlockUIDefaultName);
  });
});
