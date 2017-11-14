import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';

import { BlockElementComponent } from './block-element.component';

@NgModule({
  imports: [
    BrowserModule,
    BlockUIModule
  ],
  declarations: [
    BlockElementComponent
  ],
  exports: [
    BlockElementComponent
  ],
  entryComponents: [ BlockElementComponent ]
})
export class BlockElementModule { }
