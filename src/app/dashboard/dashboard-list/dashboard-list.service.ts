import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IDashboardsResponse } from '../dashboard';
import {AuthService} from '../../core/services/auth.service';
import {map} from 'rxjs/operators';
import {IPaginationParams} from '../../shared/interfaces';

@Injectable()
export class DashboardListService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMyDashboards(filter: string, type: string, paginationParams: IPaginationParams): Observable<IDashboardsResponse> {
    const page = paginationParams.page - 1;
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: paginationParams.pageSize,
        search: filter,
        type: type
      }
    });
    // Checking Auth so that we don't make unnecessary api calls
    if (this.authService.isAuthenticated()) {
      return this.http.get<any>(' /api/dashboard/mydashboard/page/filter', { params, observe: 'response' }).pipe(
        map(data => {
          return <IDashboardsResponse>{
            data: data.body,
            total: data.headers.get('totalentities')
          };
        }));
    } else {
      return of(<IDashboardsResponse>{});
    }
  }
  getAllDashboards(filter: string, type: string, paginationParams: IPaginationParams ): Observable<IDashboardsResponse> {
    const page = paginationParams.page - 1;
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        size: paginationParams.pageSize,
        search: filter,
        type: type
      }
    });
    return this.http.get<any>(' /api/dashboard/page/filter', { params, observe: 'response' }).pipe(
      map(data => {
        return <IDashboardsResponse>{
          data: data.body,
          total: data.headers.get('totalentities')
        };
      }));

  }
}
