import { } from 'jasmine';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlockUIModule } from '../../block-ui.module';
import { BlockUIContentComponent } from '../block-ui-content/block-ui-content.component';
import { BlockUIDefaultName } from '../../constants/block-ui-default-name.constant';
import { BlockUISettings } from '../../models/block-ui-settings.model';


describe('block-ui component', () => {

  @Component({
    selector: 'template-comp',
    template: `
    <div class="test-template">{{message}}</div>
  `
  })
  class TestTemplateComp { }

  let cf: ComponentFixture<any>;
  let testCmp: any;
  let blkContComp: DebugElement;
  let blockContentElement: HTMLElement;
  let globalSettings: BlockUISettings = {
    message: 'Global',
    delayStart: 1900,
    delayStop: 2000,
  };

  beforeEach(async(() => {
    @Component({
      selector: 'test-comp',
      template: `
        <block-ui
          [name]="blockName"
          [message]="message"
          [delayStart]="delayStart"
          [delayStop]="delayStop"
          [template]="customTmp"
        >
          <h1 class="header">Test</h1>
        </block-ui>
      `
    })
    class TestComp {
      blockName: string;
      message: string;
      delayStart: number;
      delayStop: number;
      customTmp: any;
    }

    TestBed.configureTestingModule({
      imports: [
        BlockUIModule.forRoot(globalSettings)
      ],
      declarations: [
        TestTemplateComp,
        TestComp
      ],
    })
      .compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
    blockContentElement = blkContComp.nativeElement;
    testCmp = cf.debugElement.componentInstance;
  }));

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
    let msg = 'test';
    let { componentInstance } = blkContComp;
    testCmp.message = msg;

    cf.detectChanges();

    expect(componentInstance.defaultMessage).toBe(msg);
  });

  it('passes delays to block-ui-content', () => {
    let start = 3000;
    let stop = 3000;
    let { componentInstance } = blkContComp;

    testCmp.delayStart = start;
    testCmp.delayStop = stop;

    cf.detectChanges();

    expect(componentInstance.delayStart).toBe(start);
    expect(componentInstance.delayStop).toBe(stop);
  });

  it('passes template to block-ui-content', () => {
    let { componentInstance } = blkContComp;

    testCmp.customTmp = TestTemplateComp;

    cf.detectChanges();

    expect(componentInstance.templateCmp).toBe(TestTemplateComp);
  });
});
