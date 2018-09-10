import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {

  constructor(
    private http: HttpClient
  ) { }

  public createAlgorithm(algorithm: any): Observable<any> {
    return this.http.post<any>(`/algorithm`, algorithm);
  }

  public updateAlgorithm(algorithm: any): Observable<any> {
    return this.http.patch<any>(`/algorithm/${algorithm.id}`, algorithm);
  }

  public getAlgorithms(): Observable<any> {
    return this.http.get(`/algorithm`);
  }

  public getAlgorithm(id: string): Observable<any> {
    return this.http.get(`/algorithm/${id}`);
  }

  public removeAlgorithm(id: string): Observable<any> {
    return this.http.delete(`/algorithm/${id}`);
  }
}
