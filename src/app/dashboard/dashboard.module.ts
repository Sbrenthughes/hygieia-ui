import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

// local imports
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardListComponent } from './/dashboard-list/dashboard-list.component';
import { DashboardListService } from './/dashboard-list/dashboard-list.service';
import { SharedModule } from '../shared/shared.module';
import { DashboardTeamComponent } from './dashboard-team/dashboard-team.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { WidgetComponent } from './widget/widget.component';


@NgModule({
  declarations: [
    DashboardRoutingModule.components,
    DashboardListComponent,
    DashboardTeamComponent,
    DashboardProductComponent,
    WidgetComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DashboardListService]
})
export class DashboardModule { }
