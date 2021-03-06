import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(`${environment.api}/leadership`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(`${environment.api}/leadership/` + id )
      .pipe(catchError(this.processHTTPMsgService.handleError)); 
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(`${environment.api}/leadership?featured=true`)
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
