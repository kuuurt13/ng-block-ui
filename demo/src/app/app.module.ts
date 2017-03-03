import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { BlockElementModule } from './block-element/block-element.module';

@NgModule({
  imports: [
    BrowserModule,
    BlockUIModule,
    BlockElementModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
