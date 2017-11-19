import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { BlockUIService } from '../services/block-ui.service';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';

@Injectable()
export class BlockUIPreventNavigation implements CanActivate, CanActivateChild {

  constructor(
    private blockUIService: BlockUIService
  ) {}

  canActivate() {
    return !this.blockUIService.isActive(BlockUIDefaultName);
  }

  canActivateChild() {
    return !this.blockUIService.isActive(BlockUIDefaultName);
  }
}
