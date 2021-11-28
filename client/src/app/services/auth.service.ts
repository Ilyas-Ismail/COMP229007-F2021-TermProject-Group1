import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { map } from "rxjs/operators";

const PROTOCOL = "http";
const PORT = 5000;
const API_PATH = "users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string;
  public username: string | undefined;
  auth_token: string | undefined;
  private _redirectUrl: string | undefined;

  constructor(private http: HttpClient) {
      this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/${API_PATH}`;
   }

  login(data: any): Observable<boolean> {
    return this.authenticate(data)
    .pipe(map(response => {
        if(response)
        {
            this.username = data.username;
        }
        return response
    }));
  }

  authenticate(data: any): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}/signin`, data)
    .pipe(map(response => {
        this.auth_token = response.success ? response.token : null;
        return response.success;
    }));
}

  create(data: any): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/register`, data)
    .pipe(map(response => {
        return response;
    }));
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/register`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/register`);
  }

  private getOptions() {
    return {
        headers: new HttpHeaders({
            "Authorization": `Bearer ${this.auth_token}`
        })
    }
  }

  get authenticated(): boolean {
    return !!this.auth_token;
  }

  clear() {
      this.username = '';
      this.auth_token = '';
  }

  get redirectUrl(): any{
      let result = this._redirectUrl;
      this._redirectUrl = '';
      return result;
  }

  set redirectUrl(url: string){
      this._redirectUrl = url;
  }
}
