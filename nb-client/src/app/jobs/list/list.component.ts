import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { DashboardService } from '../../dashboard/dashboard.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public jobs$: Observable<any>;
  public activity$: Observable<any>;

  public jobColumns: Array<string> = [
    'type.fa', 'title', 'type.title', 'status'
  ]

  @ViewChild('jobPaginator') paginator: MatPaginator;

  constructor(
    private store: Store<any>,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.jobs$ = this.dashboardService.getJobs().pipe(
      map(data => {
        let ds = new MatTableDataSource<any>(data);
        ds.paginator = this.paginator;
        return ds;
      })
    )
  }

}
