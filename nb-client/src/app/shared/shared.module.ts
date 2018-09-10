import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SafePipe } from './safe.pipe';
import { MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CodeEditComponent } from './code-edit/code-edit.component';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CodemirrorModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  declarations: [
    SafePipe,
    CodeEditComponent
  ],
  exports: [
    TranslateModule,
    CodeEditComponent,
    CodemirrorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    TranslateModule,
    SafePipe
  ],
  entryComponents: [
    CodeEditComponent
  ]
})
export class SharedModule { }
