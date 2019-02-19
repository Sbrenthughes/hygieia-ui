import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

// local imports
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardListComponent } from '../dashboards/dashboard-list/dashboard-list.component';
import { DashboardListService } from '../dashboards/dashboard-list/dashboard-list.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DashboardsRoutingModule.components, DashboardListComponent ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DashboardListService]
})
export class DashboardsModule { }
