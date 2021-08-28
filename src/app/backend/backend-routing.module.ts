import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { ArticlesMasterComponent } from './articles/articles-master/articles-master.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryMasterComponent } from './category/category-master/category-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentMasterComponent } from './department/department-master/department-master.component';
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
        path: 'users/master/:userId',
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
    {
        path: 'departments/master/:departmentId',
        component: DepartmentMasterComponent
    },
    {
        path: 'departments/master',
        component: DepartmentMasterComponent
    },
    {
        path: 'departments',
        component: DepartmentListComponent
    },
    {
        path: 'departments/:departmentId/categories/master/:categoryId',
        component: CategoryMasterComponent
    },
    {
        path: 'departments/:departmentId/categories/master',
        component: CategoryMasterComponent
    },
    {
        path: 'departments/:departmentId/categories',
        component: CategoryListComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
