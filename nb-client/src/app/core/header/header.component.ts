import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AuthState } from '../reducers/auth.store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<AuthState>;

  constructor(
    private authService: AuthService,
    private store: Store<any>
  ) {
    this.user$ = this.store.select('auth');
  }

  ngOnInit() {
  }

  public login() : void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }

}
