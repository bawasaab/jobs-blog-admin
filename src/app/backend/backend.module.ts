import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendRoutingModule } from './backend-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesMasterComponent } from './articles/articles-master/articles-master.component';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { UsersMasterComponent } from './users/users-master/users-master.component';
import { UsersListComponent } from './users/users-list/users-list.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ArticlesMasterComponent,
    ArticlesListComponent,
    UsersMasterComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    BackendRoutingModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BackendModule { }
