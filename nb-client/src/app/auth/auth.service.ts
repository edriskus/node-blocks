import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthModule } from './auth.module';
import { Store } from '@ngrx/store';
import { LogoutAuthAction } from '../core/reducers/auth.store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: AuthModule
})
export class AuthService {

  constructor(
    private dialog: MatDialog,
    private store: Store<any>,
    private router: Router
  ) { }

  public login(): void {
    this.dialog.open(LoginComponent, {

    })
  }

  public signup(): void {
    this.dialog.open(SignupComponent, {

    })
  }

  public logout(): void {
    this.store.dispatch(new LogoutAuthAction());
    this.router.navigate(['/']);
  }
}
