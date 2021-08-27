import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendLayoutComponent } from './layout/backend-layout/backend-layout.component';
import { FrontendLayoutComponent } from './layout/frontend-layout/frontend-layout.component';
import { Err404Component } from './shared/err404/err404.component';
import { BackendHeaderComponent } from './shared/backend-header/backend-header.component';
import { BackendFooterComponent } from './shared/backend-footer/backend-footer.component';
import { FrontendFooterComponent } from './shared/frontend-footer/frontend-footer.component';
import { FrontendHeaderComponent } from './shared/frontend-header/frontend-header.component';
import { BackendNavbarComponent } from './shared/backend-navbar/backend-navbar.component';
import { BackendSidebarComponent } from './shared/backend-sidebar/backend-sidebar.component';

import { NgxSpinnerModule } from "ngx-spinner";
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    BackendLayoutComponent,
    FrontendLayoutComponent,
    Err404Component,
    BackendHeaderComponent,
    BackendFooterComponent,
    FrontendFooterComponent,
    FrontendHeaderComponent,
    BackendNavbarComponent,
    BackendSidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
