import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { BlockUIService, BLOCKUI_DEFAULT } from 'ng-block-ui';

@Injectable()
export class BlockUIPreventNavigation implements CanActivate, CanActivateChild {

  constructor(
    private blockUIService: BlockUIService
  ) {}

  canActivate() {
    return !this.blockUIService.isActive(BLOCKUI_DEFAULT);
  }

  canActivateChild() {
    return !this.blockUIService.isActive(BLOCKUI_DEFAULT);
  }
}
