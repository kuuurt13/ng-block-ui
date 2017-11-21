import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlockUIService } from '../services/block-ui.service';
import { BlockUIInstanceService } from '../services/block-ui-instance.service';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';


@Injectable()
export class BlockUIInterceptor implements HttpInterceptor {
  private settings: any = {};

  constructor(
    private blockUIService: BlockUIService,
    private blockUIInstance: BlockUIInstanceService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldBlock(request)) {
      const requestHandler = next.handle(request);

      this.blockUIService.start(BlockUIDefaultName);

      requestHandler.subscribe(
        () => this.blockUIService.stop(BlockUIDefaultName),
        () => this.blockUIService.stop(BlockUIDefaultName)
      );
    }

    return next.handle(request);
  }

  shouldBlock(request: HttpRequest<any>): boolean {
    const { method, urlWithParams } = request;
    const { http = {} } = this.blockUIInstance.getSettings();
    const requestFilters = http.requestFilters || [];

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