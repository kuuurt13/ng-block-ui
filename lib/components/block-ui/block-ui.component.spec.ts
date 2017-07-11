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
    <block-ui [name]="blockName" [message]="message">
      <h1 class="header">Test</h1>
    </block-ui>
  `
})
class TestComp {
  blockName: string;
  message: string = 'Default...';
}

describe('block-ui component', () => {
  let cf: ComponentFixture<any>;
  let blkContComp: DebugElement;
  let blockContentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BlockUIModule ],
      declarations: [ TestComp ]
    })
    .compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
    blockContentElement = blkContComp.nativeElement;
  });

  it('appends block-ui-content', () => {
    expect(blockContentElement).toBeDefined();
  });

  it('projects transcluded elements', () => {
    let { nativeElement } = cf.debugElement.query(By.css('h1.header'));
    expect(nativeElement).not.toBe(null);
  });

  it('sets block-ui-content name to default if name is undefined', () => {
    let { componentInstance } = blkContComp;
    expect(componentInstance.name).toBe(BlockUIDefaultName);
  });

  it('passes name property to block-ui-content', () => {
    let name = 'test-name';
    let { componentInstance } = blkContComp;

    componentInstance.name = name;
    cf.detectChanges();

    expect(componentInstance.name).toBe(name);
  });

  it('passes default message property to block-ui-content', () => {
    let { componentInstance } = blkContComp;
    let message = componentInstance.message;

    cf.detectChanges();

    expect(componentInstance.message).toBe(message);
  });
});
