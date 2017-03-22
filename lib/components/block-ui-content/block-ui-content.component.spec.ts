import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlockUIModule } from '../../block-ui.module';
import { BlockUIContentComponent } from '../block-ui-content/block-ui-content.component';
import { BlockUI } from '../../decorators/block-ui.decorator';
import { BlockUIDefaultName } from '../../constants/block-ui-default-name.constant';

@Component({
  selector: 'test-comp',
  template: `
    <block-ui-content [message]="defaultMessage">
    </block-ui-content>
  `
})
class TestComp {
  @BlockUI() blockUI: any;
  defaultMessage: string;
}

describe('block-ui-content component', () => {
  let cf: ComponentFixture<any>;
  let testCmp: TestComp;
  let blkContComp: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BlockUIModule ],
      declarations: [ TestComp ]
    })
    .compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    testCmp = cf.debugElement.componentInstance;
    blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
  });

  it('hides block-ui-spinner by default', () => {
    let spinner = cf.debugElement.query(By.css('div.block-ui-spinner'));

    expect(spinner).toBe(null);
  });

  it('shows spinner on blockUI.start()', () => {
    testCmp.blockUI.start();
    cf.detectChanges();

    let spinner = cf.debugElement.query(By.css('div.block-ui-spinner'));
    expect(spinner).not.toBe(null);
  });

  it('hides spinner on blockUI.stop()', () => {
    testCmp.blockUI.start();
    cf.detectChanges();

    testCmp.blockUI.stop();
    cf.detectChanges();

    let spinner = cf.debugElement.query(By.css('div.block-ui-spinner'));
    expect(spinner).toBe(null);
  });

  it('hides spinner on blockUI.reset()', () => {
    testCmp.blockUI.reset();
    cf.detectChanges();

    testCmp.blockUI.stop();
    cf.detectChanges();

    let spinner = cf.debugElement.query(By.css('div.block-ui-spinner'));
    expect(spinner).toBe(null);
  });

  it('displays messages passed to blockUI.start()', () => {
    let expectedMessage = 'Loading...';
    testCmp.blockUI.start(expectedMessage);
    cf.detectChanges();

    let { nativeElement } = cf.debugElement.query(By.css('div.message'));
    expect(nativeElement.innerText).toBe(expectedMessage);
  });

  it('displays default message if set and no message is passed', () => {
    let defaultMessage = 'Default';
    testCmp.defaultMessage = defaultMessage;
    cf.detectChanges();

    testCmp.blockUI.start();
    cf.detectChanges();

    let { nativeElement } = cf.debugElement.query(By.css('div.message'));
    expect(nativeElement.innerText).toBe(defaultMessage);
  });

  it('passed messages take priority iver default', () => {
    let message = 'Loading...';

    testCmp.defaultMessage = 'Default';
    cf.detectChanges();

    testCmp.blockUI.start(message);
    cf.detectChanges();

    let { nativeElement } = cf.debugElement.query(By.css('div.message'));
    expect(nativeElement.innerText).toBe(message);
  });
});
