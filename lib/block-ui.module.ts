import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIComponent } from './components/block-ui.component';
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
  entryComponents: [ BlockUIComponent ],
  declarations: [
    BlockUIComponent,
    BlockUIDirective
  ],
  exports: [
    BlockUIComponent,
    BlockUIDirective
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
