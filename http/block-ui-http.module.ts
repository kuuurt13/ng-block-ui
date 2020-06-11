import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIModule, HttpSettings } from 'ng-block-ui';
import { BlockUIHttpSettings } from './block-ui-http-settings.service';
import { BlockUIInterceptor } from './block-ui-http.interceptor';


// Needed for AOT compiling
export const BlockUIHttpModuleSettings = new InjectionToken<string>('BlockUIHttpModuleSettings');

export function provideSettingsInstance(settings: HttpSettings): BlockUIHttpSettings {
  return {
    settings: {
      blockAllRequestsInProgress: true,
      ...settings
    }
  };
}

@NgModule({
  imports: [BlockUIModule]
})
export class BlockUIHttpModule {
  static forRoot(settings: HttpSettings = {}): ModuleWithProviders<BlockUIHttpModule> {
    return {
      ngModule: BlockUIHttpModule,
      providers: [
        {
          provide: BlockUIHttpModuleSettings,
          useValue: settings
        },
        {
          provide: BlockUIHttpSettings,
          useFactory: provideSettingsInstance,
          deps: [BlockUIHttpModuleSettings]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BlockUIInterceptor,
          multi: true
        }
      ]
    };
  }
}
