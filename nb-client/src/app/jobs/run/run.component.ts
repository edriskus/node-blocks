import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'job-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  @Input() job: any;
  @Output() updateJob: EventEmitter<any> = new EventEmitter();

  public block: any;
  public worker: Worker;
  public statusText: string = 'Idle';
  public status: string = 'IDLE';

  constructor(
    private jobsService: JobsService
  ) { }

  ngOnInit() {
    this.buildWorker();
  }

  public buildWorker(): void {
    this.worker = new Worker(`/api/job/${this.job.id}/runner`);
    this.worker.onmessage = this.handleWorker;
  }

  public handleWorker = (response: any): void => {
    if(this.status == 'RUNNING') {
      this.status = 'IDLE';
      let data: any = response.data;
      if(data.message) {
        this.statusText = data.message;
      } else {
        this.statusText = 'Block finished';
      }
      console.log("Got worker", data);
      this.jobsService.finishBlock(this.block.id, data).subscribe(
        res => {
          console.log("THis sTAtus", this.status);

          this.updateJob.emit();
          if(this.status == 'IDLE') {
            this.start();
          }
        },
        err => this.status = 'IDLE'
      )
    }
  }

  public start(): void {
    if(this.status == 'RUNNING') return;
    this.status = 'RUNNING';
    this.statusText = 'Running';
    this.jobsService.fetchBlock(this.job.id).subscribe(
      ({ block, job }) => {
        this.updateJob.emit(job);
        if(!block) {
          this.status = 'IDLE';
          this.statusText = 'No idle blocks available at the moment.'
        } else {
          this.block = block;
          this.statusText = `Running block #${block.id}`;
          this.worker.postMessage(block);
        }
      }
    )
  }

  public pause(): void {
    if(this.status != 'RUNNING') return;
    this.status = 'PAUSED';
    this.statusText = 'Paused';
  }

  public stop(): void {
    if(this.block) {
      this.jobsService.freeBlock(this.block.id).subscribe(
        res => {
          this.updateJob.emit();
          this.status = 'IDLE';
          this.statusText = 'Block freed';
        },
        err => null
      )
    }
  }

}
