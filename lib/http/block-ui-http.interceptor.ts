import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _finally } from 'rxjs/operator/finally';

import { BlockUIService } from '../services/block-ui.service';
import { BlockUIHttpSettings } from './block-ui-http-settings.service';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';

@Injectable()
export class BlockUIInterceptor implements HttpInterceptor {
  private settings: any = {};

  constructor(
    private blockUIService: BlockUIService,
    private BlockUIHttpSettings: BlockUIHttpSettings
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = next.handle(request);
    const response$ = req.subscribe.bind(req);
    let active = false;

    req.subscribe = (...args) => {
      if (this.shouldBlock(request)) {
        this.blockUIService.start(BlockUIDefaultName);
        active = true;
      }

      return response$(...args);
    };

    return _finally
      .call(req, () => active && this.blockUIService.stop(BlockUIDefaultName));
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
