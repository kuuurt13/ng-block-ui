import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { BlockUIModule } from './block-ui.module';
import { BlockUIInstanceService } from './services/block-ui-instance.service';
import { BlockUISettings } from './models/block-ui-settings.model';

@Component({
  selector: 'test-comp',
  template: `<div></div>`
})
class TestComp {
  constructor(
    public blockUIInstance: BlockUIInstanceService
  ) { }
}

describe('BlockUIModule', () => {
  let testCmp: TestComp;
  let blockUIInstance: BlockUIInstanceService;
  let moduleSettings: BlockUISettings = {
    message: 'test'
  };

  beforeEach(() => {
    let cf: ComponentFixture<any>;

    TestBed.configureTestingModule({
      imports: [ BlockUIModule.forRoot(moduleSettings) ],
      declarations: [ TestComp ]
    }).compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    testCmp = cf.debugElement.componentInstance;
    blockUIInstance = testCmp.blockUIInstance;
  });

  describe('"forRoot" method', () => {
    it('should be defined', () => {
      expect(BlockUIModule.forRoot).toBeDefined();
    });

    it('should pass settings to BlockUIInstanceService', () => {
      expect(blockUIInstance.getSettings()).toEqual(moduleSettings);
    });
  });
});
