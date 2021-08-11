import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendComponent } from './layout/backend/backend.component';
import { FrontendComponent } from './layout/frontend/frontend.component';
import { BackendFooterComponent } from './shared/backend/backend-footer/backend-footer.component';
import { BackendHeaderComponent } from './shared/backend/backend-header/backend-header.component';
import { FrontendFooterComponent } from './shared/frontend/frontend-footer/frontend-footer.component';
import { FrontendHeaderComponent } from './shared/frontend/frontend-header/frontend-header.component';
import { Err404Component } from './shared/err404/err404.component';

@NgModule({
  declarations: [
    AppComponent,
    BackendComponent,
    FrontendComponent,
    BackendFooterComponent,
    BackendHeaderComponent,
    FrontendFooterComponent,
    FrontendHeaderComponent,
    Err404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
