import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../core/reducers/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private user: AuthState;

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    this.store.select('auth').subscribe(
      (state: AuthState) => {
        this.user = state;
      }
    )
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!!this.user && !!this.user.token) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  private user: AuthState;

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    this.store.select('auth').subscribe(
      (state: AuthState) => {
        this.user = state;
      }
    )
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!!this.user && !!this.user.token) {
      this.router.navigate(['/dashboard']);
    } else {
      return true;
    }
  }
}

