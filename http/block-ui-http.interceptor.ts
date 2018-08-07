import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BlockUIService, BLOCKUI_DEFAULT } from 'ng-block-ui';
import { BlockUIHttpSettings } from './block-ui-http-settings.service';

@Injectable()
export class BlockUIInterceptor implements HttpInterceptor {
  private settings: any = {};

  constructor(
    private blockUIService: BlockUIService,
    private BlockUIHttpSettings: BlockUIHttpSettings
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let active = false;

    if (this.shouldBlock(request)) {
      this.blockUIService.start(BLOCKUI_DEFAULT);
      active = true;
    }

    return next.handle(request)
      .pipe(
        finalize(() => {
          active && this.blockUIService.stop(BLOCKUI_DEFAULT);
        })
      );
  }

  shouldBlock(request: HttpRequest<any>): boolean {
    const { method, urlWithParams } = request;
    const settings = this.BlockUIHttpSettings.settings;
    const requestFilters = settings.requestFilters || [];

    return !requestFilters.some((f: any) => {
      if (f && f.method && f.url) {
        return f.method.toUpperCase() === method && f.url.test(urlWithParams);
      } else if (typeof f === 'function') {
        return f(request);
      }

      return f.test(urlWithParams);
    });
  }
}
