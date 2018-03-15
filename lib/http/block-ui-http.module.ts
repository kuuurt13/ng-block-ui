import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIModule } from '../block-ui.module';
import { BlockUIHttpSettings } from './block-ui-http-settings.service';
import { BlockUIInterceptor } from './block-ui-http.interceptor';
import { HttpSettings } from '../models/block-ui-http-settings.model';


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
