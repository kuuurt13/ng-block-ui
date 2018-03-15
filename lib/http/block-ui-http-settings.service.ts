import { Injectable } from '@angular/core';
import { HttpSettings } from '../models/block-ui-http-settings.model';

@Injectable()
export class BlockUIHttpSettings {
  settings: HttpSettings = {};
}
