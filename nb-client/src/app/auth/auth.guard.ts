import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../core/reducers/auth.store';
import { userHasRole, userLoggedIn } from '../core/common.utils';

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
    if(userLoggedIn(this.user)) {
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
    if(userLoggedIn(this.user)) {
      this.router.navigate(['/dashboard']);
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CreatorGuard implements CanActivate {

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
    if(userHasRole(this.user, 'CREATOR')) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
