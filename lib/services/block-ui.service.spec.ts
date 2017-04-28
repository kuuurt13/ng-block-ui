import { } from 'jasmine';
import { TestBed } from '@angular/core/testing';

import { BlockUIModule } from '../block-ui.module';
import { BlockUIService } from './block-ui.service';
import { BlockUIInstanceService } from './block-ui-instance.service';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';

// This needs to be more thorough
// I am having issues spying on blockUIInstance.dispatch
describe('BlockUI service', () => {
  let blockUIService;

  beforeEach(() => {
    blockUIService = new BlockUIService(new BlockUIInstanceService());

    spyOn(blockUIService, 'dispatch');
  });

  describe('decorate', () => {
    const instance = 'testInstance';

    it('methods disptach corresponding actions', () => {
      blockUIService.start(instance);
      blockUIService.stop(instance);
      blockUIService.unsubscribe(instance);

      expect(blockUIService.dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.START, undefined
      );

      expect(blockUIService.dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.STOP
      );

      expect(blockUIService.dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.UNSUBSCRIBE
      );
    });

    it('start method can be passed a message', () => {
      const message = 'Test message';

      blockUIService.start(instance, message);

      expect(blockUIService.dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.START, message
      );
    });
  });
});
