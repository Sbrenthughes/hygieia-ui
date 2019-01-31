import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardListComponent } from '../dashboards/dashboard-list/dashboard-list.component';
import { DashboardListService } from '../dashboards/dashboard-list/dashboard-list.service';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [DashboardsRoutingModule.components, DashboardListComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DashboardListService]
})
export class DashboardsModule { }
