import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Survey, Question } from "./survey.model";
import { User } from "./user.model";
import { map } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

// import { ResponseModel } from "./response.model";

const PROTOCOL = "http";
const PORT = 3000;

@Injectable()
export class RestDataSource {

    baseUrl: string;
    // auth_token: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getSurveys(): Observable<Survey[]> {
        return this.http.get<Survey[]>(this.baseUrl + "surveys/list");
    }

    insertSurvey(survey: Survey): Observable<Survey> {
        return this.http.post<Survey>(`${this.baseUrl}survey/question/edit/${survey._id}`,survey);
    }

    // updateInventory(item: Inventory): Observable<Inventory> {
    //     return this.http.put<Inventory>(`${this.baseUrl}inventory/edit/${item._id}`,
    //         item, this.getOptions());
    // }

    // deleteInventory(id: string): Observable<ResponseModel> {
    //     return this.http.delete<any>(`${this.baseUrl}inventory/delete/${id}`,
    //         this.getOptions()).pipe(map(response => {
    //             return response;
    //         }));
    // }

    // authenticate(username: string, pass: string): Observable<boolean> {
    //     return this.http.post<any>(this.baseUrl + "users/signin", {
    //         username: username, password: pass
    //     }).pipe(map(response => {
    //         this.auth_token = response.success ? response.token : null;
    //         return response.success;
    //     }));
    // }

    // signupUser(user: User): Observable<ResponseModel> {
    //     return this.http.post<ResponseModel>(this.baseUrl + "users/signup", user)
    //         .pipe(map(response => {
    //             return response;
    //         }));
    // }

    // private getOptions() {
    //     return {
    //         headers: new HttpHeaders({
    //             "Authorization": `Bearer ${this.auth_token}`
    //         })
    //     }
    // }
}
