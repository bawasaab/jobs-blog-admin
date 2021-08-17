import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendLayoutComponent } from './layout/backend-layout/backend-layout.component';
import { FrontendLayoutComponent } from './layout/frontend-layout/frontend-layout.component';
import { Err404Component } from './shared/err404/err404.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: BackendLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./backend/backend.module').then( module => module.BackendModule )
            }
        ]
    },
    {
        path: '',
        component: FrontendLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./frontend/frontend.module').then( module => module.FrontendModule )
            }
        ]
    },
    {
        path: '**',
        component: Err404Component
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
