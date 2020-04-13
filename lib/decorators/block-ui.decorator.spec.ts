import { } from 'jasmine';
import { TestBed } from '@angular/core/testing';

import { BlockUIModule, BlockUIServiceInstance } from '../block-ui.module';
import { NgBlockUI } from '../models/block-ui.model';
import { BlockUI } from './block-ui.decorator';


describe('BlockUI decorator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlockUIModule.forRoot()]
    })
      .compileComponents();

    spyOn(BlockUIServiceInstance, 'decorate').and.callFake(name => ({ name }));
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

  it('it creates a unique instance name when "scopeToInstance" is true', () => {
    class TestClass {
      @BlockUI('test', { scopeToInstance: true }) blockUI: NgBlockUI;
    }

    const instance = new TestClass();
    expect(instance.blockUI.name).toBe('test-1');

    const instanceTwo = new TestClass();
    expect(instanceTwo.blockUI.name).toBe('test-2');
  });
});