import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { BlockUIModule } from '../block-ui.module';
import { BlockUIHttpModule } from './block-ui-http.module';
import { BlockUIService } from '../services/block-ui.service';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';


describe('BlockUIInterceptor', () => {
  let service: TestService;
  let httpMock: HttpTestingController;
  let blockUIService;
  let blockUIServiceSpy;

  @Injectable()
  class TestService {
    constructor(private http: HttpClient) { }

    get(url: string) {
      return new Observable(observer => {
        try {
          this.http.get<any>(url).subscribe();
        } finally {
          observer.next();
        }
      });
    }

    post(url: string, body: any = {}) {
      return new Observable(observer => {
        try {
          this.http.post<any>(url, body).subscribe();
        } finally {
          observer.next();
        }
      });
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BlockUIModule.forRoot(),
        BlockUIHttpModule.forRoot({
          requestFilters: [
            /\/nope/,
            { method: 'POST', url: /\/test/ },
            req => req.body && req.body.id === 123
          ]
        })
      ],
      providers: [
        TestService,
        BlockUIService
      ],
    });

    service = TestBed.get(TestService);
    blockUIService = TestBed.get(BlockUIService);
    blockUIServiceSpy = spyOn(blockUIService, 'start');
  });

  it('starts blocking', done => {
    service.get('/yup').subscribe(response => {
      expect(blockUIServiceSpy).toHaveBeenCalledWith(BlockUIDefaultName);
      done();
    });
  });

  it('filters by url', done => {
    service.get('/nope').subscribe(response => {
      expect(blockUIServiceSpy.calls.count()).toEqual(0);
      done();
    });
  });

  it('filters by method/url', done => {
    service.post('/test').subscribe(response => {
      expect(blockUIServiceSpy.calls.count()).toEqual(0);
      done();
    });
  });

  it('filters by function', done => {
    service.post('/yup', { id: 123 }).subscribe(response => {
      expect(blockUIServiceSpy.calls.count()).toEqual(0);
      done();
    });
  });
});
