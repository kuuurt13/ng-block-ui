import { ComponentRef } from '@angular/core';

export interface BlockUISettings {
  message?: string;
  delayStart?: number;
  delayStop?: number;
  template?: ComponentRef<{ message?: any }> | any;
}
