import { Injectable } from '@angular/core';
import { JobsModule } from './jobs.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private http: HttpClient
  ) { }

  public createJob(job: any): Observable<any> {
    return this.http.post<any>(`/job`, job);
  }

  public getJobs(): Observable<any> {
    return this.http.get(`/job`);
  }

  public getJob(id: string): Observable<any> {
    return this.http.get(`/job/${id}`);
  }

  public getAlgorithms(): Observable<any> {
    return this.http.get(`/algorithm`);
  }

  public removeJob(id: string): Observable<any> {
    return this.http.delete(`/job/${id}`);
  }

  public finalizeJob(id: string): Observable<any> {
    return this.http.get(`/job/${id}/resolve`);
  }

  public fetchBlock(id: string): Observable<any> {
    return this.http.get(`/job/${id}/fetch-block`);
  }

  public freeBlock(id: string): Observable<any> {
    return this.http.post(`/block/${id}/free`, {})
  }

  public finishBlock(id: string, result: any): Observable<any> {
    return this.http.post(`/block/${id}`, { ...result })
  }

}

