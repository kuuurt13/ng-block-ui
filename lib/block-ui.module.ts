import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIComponent, BlockUIContentComponent } from './components';
import { BlockUIService } from './services/block-ui.service';
import { BlockUIDirective } from './directives/block-ui.directive';

export const BlockUIServiceInstance = new BlockUIService();

// Needed for AOT compiling
export function provideInstance() {
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
  ],
  providers: [
    {
      provide: BlockUIService,
      useFactory: provideInstance,
      deps: []
    }
  ]
})
export class BlockUIModule { }
