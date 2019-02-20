import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

// local imports
import { DashboardListService } from './dashboard-list.service';
import { IPaginationParams } from '../../shared/interfaces';
import {IDashboards} from '../dashboard';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
  _dashboardType = '';

  queryField: FormControl = new FormControl();
  myDashboards: IDashboards[] = [];
  allDashboards: IDashboards[] = [];
  dashboardCollectionSize: string;
  myDashboardCollectionSize: string;
  dashboardListParams: IPaginationParams;
  myDashboardListParams: IPaginationParams;

  constructor(private dashboardListService: DashboardListService) { }

  ngOnInit() {
    this.dashboardListParams = <IPaginationParams>{
      page: 1,
      pageSize: '10'
    };

    this.myDashboardListParams = <IPaginationParams>{
      page: 1,
      pageSize: '10'
    };
    this.findMyDashboards();
    this.findAllDashboards();
    // Query for pull filtered owner dashboards
    this.queryField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => {
        const test = this.myDashboardListParams;
        test.page = 1;
        return this.dashboardListService.getMyDashboards( query, this._dashboardType, test ); })
    ).subscribe(response => {
        this.myDashboards = response.data;
        this.myDashboardCollectionSize = response.total;
      });
    // Query for pull filtered 'All' dashboards
    this.queryField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => {
        const test = this.dashboardListParams;
        test.page = 1;
        return this.dashboardListService.getAllDashboards( query, this._dashboardType, test ); })
      )
      .subscribe(response => {
        this.allDashboards = response.data;
        this.dashboardCollectionSize = response.total;
      });
  }

  setDashboardType(type: string) {
    this._dashboardType = type;
    this.findMyDashboards();
    this.findAllDashboards();
  }
  // Default function call for pulling users dashboards
  findMyDashboards(): void {
    let query: string;
    query = (this.queryField.value) ? this.queryField.value : '';
    this.dashboardListService.getMyDashboards(query, this._dashboardType, this.myDashboardListParams).subscribe(
      response => {
        this.myDashboards = response.data;
        this.myDashboardCollectionSize = response.total;
      },
      error => console.log(error)
    );
  }
  // Default function call for pulling all dashboards
  findAllDashboards(): void {
    let query: string;
    query = (this.queryField.value) ? this.queryField.value : '';
    this.dashboardListService.getAllDashboards(query, this._dashboardType, this.dashboardListParams).subscribe(
      response => {
        this.allDashboards = response.data;
        this.dashboardCollectionSize = response.total;
      },
      error => console.log(error)
    );
  }
  // Pagination page change function call
  myDashboardPageChange(params: IPaginationParams) {
    this.myDashboardListParams = <IPaginationParams>{
      page: params.page,
      pageSize: params.pageSize
    };
    this.findMyDashboards();
  }
  // Pagination page change function call
  allDashboardPageChange(params: IPaginationParams) {
    this.dashboardListParams = <IPaginationParams>{
      page: params.page,
      pageSize: params.pageSize
    };
    this.findAllDashboards();
  }
}
