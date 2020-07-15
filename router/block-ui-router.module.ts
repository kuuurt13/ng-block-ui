import { NgModule, ModuleWithProviders } from '@angular/core';

import { BlockUIModule } from 'ng-block-ui';
import { BlockUIPreventNavigation } from './block-ui-prevent-navigation.service';


@NgModule({
  imports: [
    BlockUIModule
  ]
})
export class BlockUIRouterModule {
  public static forRoot(): ModuleWithProviders<BlockUIRouterModule> {
    return {
      ngModule: BlockUIRouterModule,
      providers: [
        BlockUIPreventNavigation
      ]
    };
  }
}
