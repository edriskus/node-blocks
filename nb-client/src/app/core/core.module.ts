import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MatDialogModule, MatSnackBar, MatSnackBarModule, MatTableModule } from '@angular/material'

import { authReducer } from './reducers/auth.store';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';

const reducers: ActionReducerMap<any> = { authReducer };

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    StoreModule.forRoot({
      auth: authReducer
    }, { metaReducers })
  ],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule { }
