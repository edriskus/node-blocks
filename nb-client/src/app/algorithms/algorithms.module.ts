import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlgorithmsRoutingModule } from './algorithms-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from '../shared/shared.module';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FileSaverModule,
    AlgorithmsRoutingModule
  ],
  declarations: [ListComponent, ManageComponent]
})
export class AlgorithmsModule { }
