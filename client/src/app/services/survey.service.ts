import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model';

const baseUrl = 'http://localhost:3000/api/surveys';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${baseUrl}/list`);
  }

  get(id: any): Observable<Survey> {
    return this.http.get(`${baseUrl}/details/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
