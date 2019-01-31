import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// local imports
import { DashboardsComponent } from './dashboards.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule {
  static components = [DashboardsComponent];
}
