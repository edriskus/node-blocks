import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthState } from '../../core/reducers/auth.store';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user$: Observable<AuthState>;
  public jobs$: Observable<any>;
  public activity$: Observable<any>;

  public jobColumns: Array<string> = [
    'id', 'name', 'status'
  ]

  @ViewChild('jobPaginator') paginator: MatPaginator;

  constructor(
    private store: Store<any>,
    private dashboardService: DashboardService
  ) {
    this.user$ = this.store.select('auth');
  }

  ngOnInit() {
    this.jobs$ = this.dashboardService.getJobs().pipe(
      map(data => {
        let ds = new MatTableDataSource<any>(data);
        ds.paginator = this.paginator;
        return ds;
      })
    )
    this.activity$ = of([
      { date: Date.now(), title: 'Started a Job' },
      { date: Date.now(), title: 'Started a Job' },
      { date: Date.now(), title: 'Started a Job' }
    ])
  }

}
