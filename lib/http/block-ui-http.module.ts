import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BlockUIModule, BlockUIServiceInstance } from '../block-ui.module';
import { BlockUIInterceptor } from './block-ui-http.service';
import { HttpSettings } from '../models/block-ui-http-settings.model';


@NgModule({
  imports: [
    BlockUIModule
  ]
})
export class BlockUIHttpModule {
  public static forRoot(settings: HttpSettings = {}): ModuleWithProviders {
    BlockUIServiceInstance.updateSettings({ http: settings });

    return {
      ngModule: BlockUIHttpModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BlockUIInterceptor,
          multi: true
        }
      ]
    };
  }
}
