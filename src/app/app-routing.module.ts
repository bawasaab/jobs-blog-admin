import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BackendComponent } from "./layout/backend/backend.component";
import { FrontendComponent } from "./layout/frontend/frontend.component";

import { Err404Component } from "./shared/err404/err404.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: BackendComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./module/backend/backend.module').then( module => module.BackendModule )
            }
        ]
    },
    {
        path: '',
        component: FrontendComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./module/frontend/frontend.module').then( module => module.FrontendModule )
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
