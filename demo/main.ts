import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
require('./styles.css');

platformBrowserDynamic().bootstrapModule(AppModule);
