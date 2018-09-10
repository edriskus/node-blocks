import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSaverModule } from 'ngx-filesaver';

import { JobsRoutingModule } from './jobs-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { RunComponent } from './run/run.component';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material';
import { AlgorithmsComponent } from './algorithms/algorithms.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatStepperModule,
    FileSaverModule,
    JobsRoutingModule
  ],
  declarations: [CreateComponent, ListComponent, ManageComponent, RunComponent, AlgorithmsComponent]
})
export class JobsModule { }
