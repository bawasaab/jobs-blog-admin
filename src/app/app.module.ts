import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
