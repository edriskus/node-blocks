import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AlgorithmsService } from '../algorithms.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'algorithms-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public algs$: Observable<any>;
  public activity$: Observable<any>;
  public loading: boolean;

  public algColumns: Array<string> = [
    'fa', 'title'
  ]

  @ViewChild('algPaginator') paginator: MatPaginator;

  constructor(
    private store: Store<any>,
    private router: Router,
    private algorithmsService: AlgorithmsService
  ) { }

  ngOnInit() {
    this.algs$ = this.algorithmsService.getAlgorithms().pipe(
      map(data => {
        let ds = new MatTableDataSource<any>(data);
        ds.paginator = this.paginator;
        return ds;
      })
    )
  }

  public createAlg(): void {
    this.loading = true;
    this.algorithmsService.createAlgorithm({
      title: 'Untitled algorithm',
      fa: 'fas fa-box',
      inputs: '{\n  "blockCount": { "type": "number" }\n}',
      results: '{\n  "result": { "type": "string" }\n}',
      builder_code: '// Global variables: id, inputs, job\n',
      client_code: 'onmessage = function(m) {\n  var block = m.data;\n  // Calculations here\n  postMessage(/* Result */);\n}',
      resolve_code: '// Global variables: blocks, job'
    }).subscribe(
      alg => {
        this.loading = false;
        this.router.navigate([`/algorithms/${alg.id}`]);
      },
      err => this.loading = false
    )
  }

}
