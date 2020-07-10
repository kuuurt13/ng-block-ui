import { } from 'jasmine';
import { TestBed } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { BlockUIModule } from '../block-ui.module';
import { BlockUIInstanceService } from './block-ui-instance.service';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';


describe('BlockUIInstance service', () => {
  let blockUIService;

  beforeEach(() => {
    blockUIService = new BlockUIInstanceService();

    spyOn(blockUIService, 'dispatch');
  });

  describe('decorate', () => {
    it('returns NgBlockUI instance', () => {
      const blockUI = blockUIService.decorate();

      expect(blockUIService.dispatch).toHaveBeenCalledWith(
        blockUIService.blockUISubject, BlockUIActions.START, BlockUIDefaultName
      );

      expect(blockUIService.dispatch).toHaveBeenCalledWith(
        blockUIService.blockUISubject, BlockUIActions.STOP, BlockUIDefaultName
      );

      expect(blockUIService.dispatch).toHaveBeenCalledWith(
        blockUIService.blockUISubject, BlockUIActions.RESET, BlockUIDefaultName
      );
    });

    it('passes instance name to NgBlockUI instance', () => {
      const expectName = 'test';
      const blockUI = blockUIService.decorate(expectName);

      expect(blockUIService.dispatch).toHaveBeenCalledWith(
        blockUIService.blockUISubject, BlockUIActions.START, expectName
      );
    });
  });

  describe('observe', () => {
    it('returns a blockUI observable', () => {
      const blockUIObservable = blockUIService.observe();

      expect(blockUIObservable).toEqual(blockUIService.blockUIObservable);
    });

    it('observable subscribes to blockUISubject', done => {
      const blockUIObservable = blockUIService.observe();
      const expectedResult = 'test';

      blockUIService.blockUIObservable.pipe(map((data) => {
        expect(data).toEqual(expectedResult);
        done();
      }))
        .subscribe();

      blockUIService.blockUISubject.next(expectedResult);
    });
  });

  describe('dispatch', () => {
    let expectedData = {
      name: BlockUIDefaultName,
      action: BlockUIActions.START,
      message: undefined
    };

    beforeEach(() => {
      blockUIService = new BlockUIInstanceService();

      spyOn(blockUIService.blockUISubject, 'next');
    });

    it('invokes blockUISubject next method', () => {
      const dispatcher = blockUIService.dispatch(
        blockUIService.blockUISubject, BlockUIActions.START
      );

      dispatcher();

      expect(blockUIService.blockUISubject.next).toHaveBeenCalledWith(expectedData);
    });

    it('passes message to dispatched data', () => {
      const message = 'Loading...';

      const dispatcher = blockUIService.dispatch(
        blockUIService.blockUISubject, BlockUIActions.START
      );

      dispatcher(message);

      expect(blockUIService.blockUISubject.next).toHaveBeenCalledWith(
        { ...expectedData, message }
      );
    });
  });
});
