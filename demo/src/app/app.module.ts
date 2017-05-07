import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';

import { BlockElementModule } from './block-element/block-element.module';
import { AppComponent } from './app.component';
import { BlockTemplateComponent } from './block-template/block-template.component';

@NgModule({
  imports: [
    BrowserModule,
    BlockUIModule,
    BlockElementModule
  ],
  declarations: [
    AppComponent,
    BlockTemplateComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [ BlockTemplateComponent ]
})
export class AppModule { }
