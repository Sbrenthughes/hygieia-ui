import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// local imports
import { AuthService } from '../../core/services/auth.service';
import { IUserLogin } from '../../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  _authName: string;
  _activeTab: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout();
    this.buildForm();
    this.authService.getAuthenticationProviders().subscribe((data: any) => {
      this.setActiveTab(data[0]);
    });
  }
  isStandLogin(): boolean {
    return this._activeTab === 'STANDARD';
  }
  isLdapLogin(): boolean {
    return this._activeTab === 'LDAP';
  }
  setActiveTab(tab: string) {
    if ( tab ) {
      this._activeTab = tab;
      this._authName = tab;
    }
  }
  buildForm() {
    this.loginForm = this.formBuilder.group({
      username:      ['', [ Validators.required ]],
      password:   ['', [ Validators.required ]]
    });
  }

  submit({ value }: { value: IUserLogin }) {
    let login;
    if (this.isStandLogin()) {
      login = this.authService.login(value);
    } else {
      login = this.authService.loginLdap(value);
    }
    login.subscribe((status: boolean) => {
          if (status) {
            if (this.authService.redirectUrl) {
              const redirectUrl = this.authService.redirectUrl;
              this.authService.redirectUrl = '';
              this.router.navigate([redirectUrl]);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
        (err: any) => {
          this.errorMessage = err.error.message;
        });
  }
  signUp() {
    this.router.navigate(['/user/signup']);
  }
}

