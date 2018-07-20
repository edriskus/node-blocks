import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { ManageComponent } from './manage/manage.component';
import { RunComponent } from './run/run.component';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatStepperModule,
    JobsRoutingModule
  ],
  declarations: [CreateComponent, ListComponent, ViewComponent, ManageComponent, RunComponent]
})
export class JobsModule { }
