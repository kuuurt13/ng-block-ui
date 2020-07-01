import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from './block-template/block-template.component';

@NgModule({
  imports: [
    BrowserModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    })
  ],
  declarations: [
    AppComponent,
    BlockTemplateComponent
  ],
  entryComponents: [
    BlockTemplateComponent // Make sure to add it to the entry components
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
