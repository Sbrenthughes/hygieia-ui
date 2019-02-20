import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// local imports
import { DashboardComponent } from './dashboard.component';
import { DashboardTeamComponent } from './dashboard-team/dashboard-team.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard/:id/team',
    component: DashboardTeamComponent
  },
  {
    path: 'dashboard/:id/product',
    component: DashboardProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
  static components = [DashboardComponent];
}
