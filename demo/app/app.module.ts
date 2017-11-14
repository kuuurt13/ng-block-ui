import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';

import { BlockElementModule } from './block-element/block-element.module';
import { BlockTemplateModule } from './block-template/block-template.module';
import { AppComponent } from './app.component';
import { BlockTemplateComponent } from './block-template/block-template.component';

@NgModule({
  imports: [
    BrowserModule,
    BlockElementModule,
    BlockUIModule.forRoot({
      message: 'Global Default Message',
      delayStart: 500,
      delayStop: 500,
      template: BlockTemplateComponent
    })
  ],
  declarations: [
    BlockTemplateComponent,
    AppComponent
  ],
  providers: [],
  entryComponents: [
    BlockTemplateComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
