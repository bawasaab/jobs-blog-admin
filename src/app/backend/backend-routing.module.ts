import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { ArticlesMasterComponent } from './articles/articles-master/articles-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersMasterComponent } from './users/users-master/users-master.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'articles/master/:articleId',
        component: ArticlesMasterComponent
    },
    {
        path: 'articles/master',
        component: ArticlesMasterComponent
    },
    {
        path: 'articles',
        component: ArticlesListComponent
    },
    {
        path: 'users/master/:articleId',
        component: UsersMasterComponent
    },
    {
        path: 'users/master',
        component: UsersMasterComponent
    },
    {
        path: 'users',
        component: UsersListComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
