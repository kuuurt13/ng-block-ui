import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIModule, HttpSettings } from 'ng-block-ui';
import { BlockUIHttpSettings } from './block-ui-http-settings.service';
import { BlockUIInterceptor } from './block-ui-http.interceptor';


// Needed for AOT compiling
export const BlockUIHttpModuleSettings = new InjectionToken<string>('BlockUIHttpModuleSettings');

export function provideSettingsInstance(settings: HttpSettings): BlockUIHttpSettings {
  return { settings };
}

@NgModule({
  imports: [BlockUIModule]
})
export class BlockUIHttpModule {
  public static forRoot(settings: HttpSettings = {}): ModuleWithProviders {
    const defaultSettings: HttpSettings = {
      blockAllRequestsInProgress: true
    }

    return {
      ngModule: BlockUIHttpModule,
      providers: [
        {
          provide: BlockUIHttpModuleSettings,
          useValue: {
            ...defaultSettings,
            ...settings
          }
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
