import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormController } from '../../shared/controllers/form.controller';
import { AuthDataService } from '../auth-data.service';
import { NotifyService } from '../../core/notify.service';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { LoginAuthAction, AuthState } from '../../core/reducers/auth.store';
import { Router } from '@angular/router';

export const PASS_REGEX = new RegExp(/./);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormController implements OnInit {

  constructor(
    protected fb: FormBuilder,
    private authDataService: AuthDataService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private notifyService: NotifyService,
    private store: Store<any>,
    private router: Router
  ) {
    super(fb);
  }

  protected buildForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(PASS_REGEX)]]
    })
  }

  public login(): void {
    this.submitAttempted = true;
    if(!this.form.valid) return;
    this.authDataService.doLogin(
      this.form.value
    ).subscribe(
      res => {
        this.store.dispatch(new LoginAuthAction(new AuthState(res.user.email, res.user.username, res.token)))
        this.router.navigate(['/dashboard'])
        this.dialogRef.close();
      }
    )
  }

}
