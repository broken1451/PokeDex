import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: 'pokemon',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then(m=>m.PagesModule)
  },
  {
    path: '**',
    redirectTo: 'pokemon'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
