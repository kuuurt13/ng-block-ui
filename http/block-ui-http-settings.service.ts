import { Injectable } from '@angular/core';
import { HttpSettings } from 'ng-block-ui';

@Injectable()
export class BlockUIHttpSettings {
  settings: HttpSettings = {};
}
