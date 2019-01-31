import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '', loadChildren: './dashboards/dashboards.module#DashboardsModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }