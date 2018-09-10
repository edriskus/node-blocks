import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  public job: any;
  public jobResult: any;
  public fetchResponse: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService
  ) { }

  ngOnInit() {
    this.getJob();
  }

  public getJob(): void {
    this.route.params.pipe(
      mergeMap(
        params => this.jobsService.getJob(params['id'])
      )
    ).subscribe(job => {
      this.job = job;
    }, err => {
      this.router.navigate([`/jobs`]);
    })
  }

  public remove(job: any): void {
    this.jobsService.removeJob(job.id).subscribe(
      res => this.router.navigate([`/jobs`])
    )
  }

  public finalizeJob(): void {
    this.jobsService.finalizeJob(this.job.id).subscribe(
      res => this.jobResult = res,
      err => this.jobResult = err.error
    )
  }

  public fetchBlock(): void {
    this.fetchResponse = '...';
    this.jobsService.fetchBlock(this.job.id).subscribe(
      res => {
        this.fetchResponse = res;
        this.getJob();
      },
      err => this.fetchResponse = err
    )
  }

  public jobProgress(job): number {
    if(!job) return 0;
    if(job.blocks < 1) return 0;
    return (+job.finished_blocks / +job.blocks) * 100;
  }
}
