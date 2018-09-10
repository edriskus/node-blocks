import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private translations: any = {
    'common.close': 'common.close'
  };

  constructor(
    private snackbar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.translate.get(Object.keys(this.translations)).subscribe(
      res => {
        this.translations = res
      }
    )
  }

  public error(message: string): void {
    this.snackbar.open(message, this.translations['common.close'], {
      panelClass: 'snack-error',
      duration: 5000
    })
  }

  public notify(message: string): void {
    this.snackbar.open(message, this.translations['common.close'], {
      duration: 5000
    })
  }
}
