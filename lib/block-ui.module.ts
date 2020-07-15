import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIComponent } from './components/block-ui/block-ui.component';
import { BlockUIContentComponent } from './components/block-ui-content/block-ui-content.component';
import { BlockUIInstanceService } from './services/block-ui-instance.service';
import { BlockUIService } from './services/block-ui.service';
import { BlockUIDirective } from './directives/block-ui.directive';
import { BlockUISettings } from './models/block-ui-settings.model';

export const BlockUIServiceInstance = new BlockUIInstanceService();

// Needed for AOT compiling
export const BlockUIModuleSettings = new InjectionToken<string>('BlockUIModuleSettings');

export function provideInstance(settings: BlockUISettings): any {
  BlockUIServiceInstance.updateSettings(settings);
  return BlockUIServiceInstance;
}

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [
    BlockUIComponent,
    BlockUIContentComponent
  ],
  declarations: [
    BlockUIComponent,
    BlockUIDirective,
    BlockUIContentComponent
  ],
  exports: [
    BlockUIComponent,
    BlockUIDirective,
    BlockUIContentComponent
  ]
})
export class BlockUIModule {
  public static forRoot(settings: BlockUISettings = {}): ModuleWithProviders<BlockUIModule> {
    return {
      ngModule: BlockUIModule,
      providers: [
        {
          provide: BlockUIModuleSettings,
          useValue: settings
        },
        {
          provide: BlockUIInstanceService,
          useFactory: provideInstance,
          deps: [BlockUIModuleSettings]
        },
        BlockUIService
      ]
    };
  }
}
