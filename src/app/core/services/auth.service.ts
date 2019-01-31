import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// 3rd party import
import { JwtHelperService } from '@auth0/angular-jwt';

// local imports
import { IUserLogin } from '../../shared/interfaces';
import { IUser } from '../../shared/interfaces';

const helper = new JwtHelperService();
const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json;v=1',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  getAuthenticationProviders(): any {
    const authenticationProvidersRoute = '/api/authenticationProviders';
    return this.http.get( authenticationProvidersRoute, httpOptions );
  }
  register(userLogin: IUserLogin): Observable<boolean> {
    return this.http.post(`/api/registerUser`, userLogin,
      { observe: 'response'})
    .pipe(
        map(loggedIn => {
          const token = loggedIn.headers.get('x-authentication-token');
          localStorage.setItem('access_token', token);
          if (token) {
            return true;
          }
        })
      );
  }
  loginLdap(userLogin: IUserLogin): Observable<boolean> {
    return this.callLogin(userLogin, `/api/login/ldap`);
  }

  login(userLogin: IUserLogin): Observable<boolean> {
    return this.callLogin(userLogin, `/api/login`);
  }

  private callLogin(userLogin: IUserLogin, path: string): Observable<boolean> {
    const params = new HttpParams({
      fromObject: {
        username: userLogin.username,
        password: userLogin.password,
      }
    });
    return this.http.post<boolean>( path,
      params,
      { headers: {'Content-Type': 'application/x-www-form-urlencoded'}, observe: 'response'})
      .pipe(
        map(loggedIn => {
          const token = loggedIn.headers.get('x-authentication-token');
          localStorage.setItem('access_token', token);
          if (token) {
            return true;
          }
        })
      );
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public getUserName(): string {
    return this.getUser().sub;
  }

  public getExpiration(): number {
    return this.getUser().exp;
  }

  public isAdmin(): boolean {
    const user = this.getUser();
    if (user.roles && user.roles.indexOf('ROLE_ADMIN') > -1) { return true; }
    return false;
  }

  public getAuthType(): string {
    return this.getUser().details;
  }

  public isAuthenticated(): boolean {
    if (!helper.isTokenExpired( this.getToken() ) && this.getUserName() ) {
      return true;
    }
    return false;
  }

  private getUser(): IUser {
    const token = this.getToken();
    if (token) {
      return helper.decodeToken(this.getToken());
    } else {
      return <IUser>{};
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Server error');
  }

}
