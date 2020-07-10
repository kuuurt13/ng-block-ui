import { } from 'jasmine';
import { ComponentFixture, TestBed, fakeAsync, flush, tick, async } from '@angular/core/testing';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BlockUIModule } from '../../block-ui.module';
import { BlockUIContentComponent } from '../block-ui-content/block-ui-content.component';
import { BlockUI } from '../../decorators/block-ui.decorator';

describe('block-ui-content component', () => {
  describe('block-ui-content component no template:', () => {
    @Component({
      selector: 'test-comp',
      template: `
        <block-ui-content
          [name]="'content-test'"
          [message]="defaultMessage"
          [delayStart]="delayStart"
          [delayStop]="delayStop"
        >
        </block-ui-content>
      `
    })
    class TestComp {
      @BlockUI('content-test') blockUI: any;
      defaultMessage: string;
      delayStart: number = 0;
      delayStop: number = 0;
    }

    let cf: ComponentFixture<any>;
    let testCmp: TestComp;
    let blkContComp: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlockUIModule.forRoot()],
        declarations: [TestComp]
      })
        .compileComponents();

      cf = TestBed.createComponent(TestComp);
      cf.detectChanges();

      testCmp = cf.debugElement.componentInstance;
      blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));

      testCmp.blockUI.reset();
    });


    it('block-ui-wrapper is not active by default', fakeAsync(() => {
      let blockWrapper = cf.debugElement.query(By.css('div.block-ui-wrapper'));
      expect(blockWrapper.classes.active).toBeFalsy();
    }));

    it('block-ui-wrapper is active on blockUI.start()', fakeAsync(() => {
      testCmp.blockUI.start();
      tick(1);
      cf.detectChanges();

      let blockWrapper = cf.debugElement.query(By.css('div.block-ui-wrapper'));
      expect(blockWrapper.classes.active).toBeTruthy();
    }));

    it('block-ui-wrapper is no longer active on blockUI.stop()', fakeAsync(() => {
      testCmp.blockUI.start();
      tick(1);
      cf.detectChanges();

      testCmp.blockUI.stop();
      tick(1);
      cf.detectChanges();

      let blockWrapper = cf.debugElement.query(By.css('div.block-ui-wrapper'));
      expect(blockWrapper.classes.active).toBeFalsy();
    }));

    it('block-ui-wrapper is no longer active on blockUI.reset()', fakeAsync(() => {
      testCmp.blockUI.reset();
      tick(1);
      cf.detectChanges();

      let blockWrapper = cf.debugElement.query(By.css('div.block-ui-wrapper'));
      expect(blockWrapper.classes.active).toBeFalsy();
    }));

    it('displays messages passed to blockUI.start()', fakeAsync(() => {
      let expectedMessage = 'Loading...';
      testCmp.blockUI.start(expectedMessage);
      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('div.message'));
      expect(nativeElement.innerText).toBe(expectedMessage);
    }));

    it('displays default message if set and no message is passed', fakeAsync(() => {
      let defaultMessage = 'Default';
      testCmp.defaultMessage = defaultMessage;

      tick(1);
      cf.detectChanges();

      testCmp.blockUI.start();

      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('div.message'));
      expect(nativeElement.innerText).toBe(defaultMessage);
    }));

    it('passed messages take priority over default', fakeAsync(() => {
      let message = 'Loading...';
      testCmp.defaultMessage = 'Default';
      cf.detectChanges();

      testCmp.blockUI.start(message);
      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('div.message'));
      expect(nativeElement.innerText).toBe(message);
    }));

    it('displays message passed to blockUI.update()', fakeAsync(() => {
      let initialMessage = 'Loading...';
      testCmp.blockUI.start(initialMessage);

      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('div.message'));
      expect(nativeElement.innerText).toBe(initialMessage);

      let updatedMessage = 'Update';
      testCmp.blockUI.update(updatedMessage);
      flush();
      cf.detectChanges();
      expect(nativeElement.innerText).toBe(updatedMessage);
    }));

    it('blockUI.start() is synchronous (issue #107)', fakeAsync(() => {
      function method() {
        testCmp.blockUI.start();
      }

      const observable = Observable.create((observer: any) => {
        observer.next('test');
      });

      testCmp.blockUI.start();

      observable.subscribe(() => {
        testCmp.blockUI.stop();
        method();
      });

      tick(1);
      cf.detectChanges();
      let blockWrapper = cf.debugElement.query(By.css('div.block-ui-wrapper'));
      expect(blockWrapper.classes.active).toBeTruthy();
    }));
  });

  describe('block-ui-content custom Component template', () => {
    @Component({
      selector: 'template-comp',
      template: `
        <div class="test-template">{{message}}</div>
      `
    })
    class TestTemplateComp { }

    @Component({
      selector: 'test-comp',
      template: `
        <block-ui-content
          [name]="'content-test'"
          [delayStart]="0"
          [delayStop]="0"
          [message]="defaultMessage"
          [template]="template"
        ></block-ui-content>
      `
    })
    class TestComp {
      @BlockUI('content-test') blockUI: any;
      defaultMessage: string;
      template = TestTemplateComp;
    }

    @NgModule({
      imports: [BlockUIModule.forRoot()],
      declarations: [
        TestTemplateComp,
        TestComp
      ],
      entryComponents: [TestTemplateComp]
    })
    class TestModule { }

    let cf: ComponentFixture<any>;
    let testCmp: TestComp;
    let blkContComp: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BlockUIModule.forRoot(),
          TestModule
        ]
      })
        .compileComponents();

      cf = TestBed.createComponent(TestComp);
      cf.detectChanges();

      testCmp = cf.debugElement.componentInstance;
      blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));

      testCmp.blockUI.reset();
    });

    it('appends template to blockUIContent', fakeAsync(() => {
      let template;

      template = cf.debugElement.query(By.css('.test-template'));
      expect(template).toBeDefined();
    }));

    it('default spinner is hidden when template is passed', fakeAsync(() => {
      testCmp.blockUI.start();
      tick(1);
      cf.detectChanges();

      let spinner = cf.debugElement.query(By.css('.block-ui-spinner'));
      expect(spinner).toBe(null);
    }));

    it('displays messages passed to blockUI.start()', fakeAsync(() => {
      let expectedMessage = 'Loading...';
      testCmp.blockUI.start(expectedMessage);

      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('.test-template'));
      expect(nativeElement.innerText).toBe(expectedMessage);
    }));

    it('displays default message if set and no message is passed', fakeAsync(() => {
      let defaultMessage = 'Default';
      flush();

      testCmp.defaultMessage = defaultMessage;
      tick(1);
      cf.detectChanges();

      testCmp.blockUI.start();
      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('.test-template'));
      expect(nativeElement.innerText).toBe(defaultMessage);
    }));
  });

  describe('block-ui-content custom TemplateRef template', () => {
    @Component({
      selector: 'test-comp',
      template: `
        <ng-template class="ref-template" #templateTest>
          <div class="test-template">Test</div>
        </ng-template>
        <block-ui-content
          [name]="'content-test'"
          [delayStart]="0"
          [delayStop]="0"
          [message]="defaultMessage"
          [template]="templateTest"
        ></block-ui-content>
      `
    })
    class TestComp {
      @BlockUI('content-test') blockUI: any;
      defaultMessage: string;
      templateTest;
    }

    @NgModule({
      imports: [BlockUIModule.forRoot()],
      declarations: [TestComp]
    })
    class TestModule { }

    let cf: ComponentFixture<any>;
    let testCmp: TestComp;
    let blkContComp: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BlockUIModule.forRoot(),
          TestModule
        ]
      })
        .compileComponents();

      cf = TestBed.createComponent(TestComp);
      cf.detectChanges();

      testCmp = cf.debugElement.componentInstance;
      blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
      testCmp.blockUI.reset();
    });

    it('appends template to blockUIContent', fakeAsync(() => {
      let template;

      template = cf.debugElement.query(By.css('.test-template'));
      expect(template).toBeDefined();
    }));

    it('default spinner is hidden when template is passed', fakeAsync(() => {
      testCmp.blockUI.start('Loading...');
      tick(1);
      cf.detectChanges();

      let spinner = cf.debugElement.query(By.css('.block-ui-spinner'));
      expect(spinner).toBe(null);
    }));
  });

  describe('block-ui-content module settings', () => {
    @Component({
      selector: 'test-comp',
      template: `
        <block-ui-content
          [message]="defaultMessage"
          [name]="'content-test'"
          [delayStart]="0"
          [delayStop]="0"
        >
        </block-ui-content>
      `
    })
    class TestComp {
      @BlockUI('content-test') blockUI: any;
      defaultMessage: string;
    }

    let cf: ComponentFixture<any>;
    let testCmp: TestComp;
    let blkContComp: DebugElement;
    let globalMessage: string = 'Global Message';

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          BlockUIModule.forRoot({
            message: globalMessage
          })
        ],
        declarations: [TestComp],
      }).compileComponents();

      cf = TestBed.createComponent(TestComp);
      cf.detectChanges();

      testCmp = cf.debugElement.componentInstance;
      blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
    }));

    afterEach(() => {
      cf.destroy();
    });

    it('displays module default message on start', fakeAsync(() => {
      testCmp.blockUI.start();
      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('div.message'));
      expect(nativeElement.innerText.trim()).toBe(globalMessage);
    }));

    it('setting message on block-ui-content overrides module level', fakeAsync(() => {
      let defaultMessage = 'Default';

      testCmp.defaultMessage = defaultMessage;
      tick(1);
      cf.detectChanges();

      testCmp.blockUI.start();
      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('div.message'));
      expect(nativeElement.innerText.trim()).toBe(defaultMessage);
    }));

    it('message passed to start overrides module message', fakeAsync(() => {
      let expectedMessage = 'Loading...';

      testCmp.blockUI.start(expectedMessage);
      tick(1);
      cf.detectChanges();

      let { nativeElement } = cf.debugElement.query(By.css('div.message'));
      expect(nativeElement.innerText).toBe(expectedMessage);
    }));
  });

  describe('block-ui-content delays', () => {
    @Component({
      selector: 'test-comp',
      template: `
        <block-ui-content
          name="content-test"
          [message]="defaultMessage"
          [delayStart]="delayStart"
          [delayStop]="delayStop"
        >
        </block-ui-content>
      `
    })
    class TestComp {
      @BlockUI('content-test') blockUI: any;
      defaultMessage: string;
      delayStart: number = 500;
      delayStop: number = 500;
    }

    let cf: ComponentFixture<any>;
    let testCmp: TestComp;
    let blkContComp: BlockUIContentComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlockUIModule.forRoot()],
        declarations: [TestComp]
      })
        .compileComponents();

      cf = TestBed.createComponent(TestComp);
      cf.detectChanges();

      testCmp = cf.debugElement.componentInstance;
      blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent)).componentInstance;

      testCmp.blockUI.reset();
    });

    it('blocker is NOT active on blockUI.start() until delay has passed', fakeAsync(() => {
      testCmp.blockUI.start();
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(0);

      tick(200);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(0);

      tick(300);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(1);
    }));

    it('blocker is active on blockUI.stop() until delay has passed', fakeAsync(() => {
      testCmp.blockUI.start();
      tick(500);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBeTruthy();

      testCmp.blockUI.stop();
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBeTruthy();

      tick(200);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBeTruthy();

      tick(300);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(0);
    }));

    it('blocker is NOT active on blockUI.stop() and state is cleared if delayed start has not yet passed, ignoring delayStop', fakeAsync(() => {
      testCmp.blockUI.start();
      tick(300);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(0);

      testCmp.blockUI.stop();
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(0);

      tick(1000);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(0);
    }));

    it('blocker is active on blockUI.stop() until all blocked calls have resolved', fakeAsync(() => {
      testCmp.blockUI.start();
      testCmp.blockUI.start();
      testCmp.blockUI.start();
      tick(500);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(3);

      testCmp.blockUI.stop();
      tick(500);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBeTruthy();
      expect(blkContComp.state.blockCount).toBe(2);

      testCmp.blockUI.stop();
      tick(500);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(1);

      testCmp.blockUI.stop();
      tick(500);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(0);
    }));

    it('blocker is no longer active on blockUI.reset(), ignoring any delays or outstanding calls', fakeAsync(() => {
      testCmp.blockUI.start();
      testCmp.blockUI.start();
      testCmp.blockUI.start();
      tick(500);
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(3);

      testCmp.blockUI.reset();
      cf.detectChanges();

      expect(blkContComp.state.blockCount).toBe(0);
    }));
  });

  describe('reset & resetGlobal', () => {
    @Component({
      selector: 'test-comp',
      template: `
        <block-ui-content [name]="'block-1'" [delayStart]="0" [delayStop]="0">
        </block-ui-content>
        <block-ui-content [name]="'block-2'" [delayStart]="0" [delayStop]="0">
        </block-ui-content>
      `
    })
    class TestComp {
      @BlockUI('block-1') blockUIOne: any;
      @BlockUI('block-2') blockUITwo: any;
      defaultMessage: string;
    }

    let cf: ComponentFixture<any>;
    let testCmp: TestComp;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlockUIModule.forRoot()],
        declarations: [TestComp]
      })
        .compileComponents();

      cf = TestBed.createComponent(TestComp);
      cf.detectChanges();

      testCmp = cf.debugElement.componentInstance;
    });

    it('reset only targets the blockUI instance', fakeAsync(() => {
      testCmp.blockUIOne.start();
      testCmp.blockUIOne.start();
      testCmp.blockUITwo.start();
      cf.detectChanges();
      tick(0);

      const blockOneInstance = cf.debugElement.query(By.css('.block-ui-wrapper.block-1')).componentInstance;
      const blockTwoInstance = cf.debugElement.query(By.css('.block-ui-wrapper.block-2')).componentInstance;

      expect(blockOneInstance.state.blockCount).toBe(2);
      expect(blockTwoInstance.state.blockCount).toBe(1);

      testCmp.blockUIOne.reset();
      cf.detectChanges();

      expect(blockOneInstance.state.blockCount).toBe(0);
      expect(blockTwoInstance.state.blockCount).toBe(1);
    }));

    it('resetGlobal targets all blockUI instance', fakeAsync(() => {
      testCmp.blockUIOne.start();
      testCmp.blockUIOne.start();
      testCmp.blockUITwo.start();
      cf.detectChanges();
      tick(0);

      const blockOneInstance = cf.debugElement.query(By.css('.block-ui-wrapper.block-1')).componentInstance;
      const blockTwoInstance = cf.debugElement.query(By.css('.block-ui-wrapper.block-2')).componentInstance;

      expect(blockOneInstance.state.blockCount).toBe(2);
      expect(blockTwoInstance.state.blockCount).toBe(1);

      testCmp.blockUIOne.resetGlobal();
      cf.detectChanges();

      expect(blockOneInstance.state.blockCount).toBe(0);
      expect(blockTwoInstance.state.blockCount).toBe(0);
    }));
  });
});

