import { Injectable } from '@angular/core';
import { JobsModule } from './jobs.module';

@Injectable({
  providedIn: JobsModule
})
export class JobsService {

  constructor() { }
}
