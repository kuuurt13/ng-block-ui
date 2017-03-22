import { } from 'jasmine';
import { TestBed } from '@angular/core/testing';

import { BlockUIModule, BlockUIServiceInstance } from '../block-ui.module';
import { NgBlockUI } from '../models/block-ui.model';
import { BlockUI } from './block-ui.decorator';


describe('BlockUI decorator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlockUIModule]
    })
      .compileComponents();

    spyOn(BlockUIServiceInstance, 'decorate');
  });

  it('sets blockUI to instance of NgBlockUI', () => {
    class TestClass {
      @BlockUI() blockUI: NgBlockUI;
    }

    expect(BlockUIServiceInstance.decorate).toHaveBeenCalled();
  });

  it('pass name to NgBlockUI instance', () => {
    class TestClass {
      @BlockUI('test') blockUI: NgBlockUI;
    }

    expect(BlockUIServiceInstance.decorate).toHaveBeenCalledWith('test');
  });
});
