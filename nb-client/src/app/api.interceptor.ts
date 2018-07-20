import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Store, select } from '@ngrx/store';
import { AuthState } from './core/reducers/auth.store';
import { NotifyService } from './core/notify.service';

export const EXCLUDED_PATHS = [
  'assets/i18n'
]

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private token: string;

  constructor(private store: Store<any>) {
    store.pipe(select('auth')).subscribe(
      (auth: AuthState) => {
        this.token = auth.token;
      }
    )
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string;
    let url = req.url;
    if(!this.pathExcluded(url)) {
      url = environment.api + url;
      if(this.token) token = 'Bearer ' + this.token;
    }
    return next.handle(req.clone({
      url,
      setHeaders: {
        "Authorization": token || ''
      }
    }));
  }

  private pathExcluded(url: string): boolean {
    return !!EXCLUDED_PATHS.find(path => {
      return url.indexOf(path) != -1;
    })
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public notifyService: NotifyService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((err, caught) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.status, err.error);

          if(err.status > 200 && err.status < 400) {
            return caught;
          } else if(err.error && err.error.message) {
            let snackBarRef = this.notifyService.error(err.error.message);
          }
        }
        return Observable.throw(err);
      })
    )
  }
}
