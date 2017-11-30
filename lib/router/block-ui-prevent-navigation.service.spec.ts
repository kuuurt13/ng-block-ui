import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlockUIModule } from '../block-ui.module';
import { BlockUIService } from '../services/block-ui.service';
import { BlockUI } from '../decorators/block-ui.decorator';
import { BlockUIRouterModule } from './block-ui-router.module';
import { BlockUIPreventNavigation } from './block-ui-prevent-navigation.service';


describe('block-ui-prevent-navigation', () => {
  @Component({
    selector: 'landing-comp',
    template: `<block-ui><div></div></block-ui>`
  })
  class LandingComp {
  }

  @Component({
    selector: 'template-comp',
    template: `<div></div>`
  })
  class TestComp {
    @BlockUI() blockUI: any;

    constructor(
      public router: Router
    ) {}
  }

  let cf: ComponentFixture<any>;
  let testCmp: TestComp;

  beforeEach(() => {
    const appRoutes: Routes = [
      { path: '', canActivateChild: [BlockUIPreventNavigation], children: [
        { path: '', component: TestComp },
        { path: 'landing-page', component: LandingComp }
      ]}
    ];

    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        BlockUIModule.forRoot(),
        BlockUIRouterModule.forRoot()
      ],
      declarations: [
        TestComp,
        LandingComp
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    testCmp = cf.debugElement.componentInstance;
  });

  it('should block navigation if blocking', () => {
    testCmp.blockUI.reset();
    testCmp.blockUI.start();

    cf.detectChanges();

    testCmp.router.navigate(['landing-page'])
      .then(canActivate => {
        expect(canActivate).toBeFalsy();
      });
  });

  it('should\'nt block if not blocking', () => {
    testCmp.blockUI.reset();

    cf.detectChanges();

    testCmp.router.navigate(['landing-page'])
      .then(canActivate => {
        expect(canActivate).toBeTruthy();
      });
  });
});
