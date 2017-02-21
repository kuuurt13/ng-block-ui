import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlockUIModule } from '../../src/block-ui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BlockUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
