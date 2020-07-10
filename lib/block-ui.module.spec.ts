import { } from 'jasmine';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { BlockUIModule } from './block-ui.module';
import { BlockUIInstanceService } from './services/block-ui-instance.service';
import { BlockUISettings } from './models/block-ui-settings.model';


describe('BlockUIModule', () => {
  @Component({
    selector: 'test-comp',
    template: `<div></div>`
  })
  class TestComp {
    constructor(
      public blockUIInstance: BlockUIInstanceService
    ) { }
  }

  let testCmp: TestComp;
  let cf: ComponentFixture<any>;
  let blockUIInstance: BlockUIInstanceService;
  let moduleSettings: BlockUISettings = {
    message: 'test'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BlockUIModule.forRoot(moduleSettings)],
      declarations: [TestComp]
    }).compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    testCmp = cf.debugElement.componentInstance;
    blockUIInstance = testCmp.blockUIInstance;
  }));

  afterEach(() => {
    cf.destroy();
    testCmp = null;
  });

  describe('"forRoot" method', () => {
    it('should be defined', () => {
      expect(BlockUIModule.forRoot).toBeDefined();
    });

    it('should pass settings to BlockUIInstanceService', () => {
      const settings = blockUIInstance.getSettings();
      expect(settings.message).toEqual(moduleSettings.message);
    });
  });
});
