import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from '../env';
import {Exam} from './exams.model';
//import * as Auth0 from 'auth0-web';
//import { AuthService } from '@auth0/auth0-angular';

interface tokener{
    token_type: string;
    access_token: string;
}

@Injectable()
export class ExamsApiService {
    private resp: any;
    private token!: string;

    constructor(private http: HttpClient) {
    }
    /*
    getToken = async () => {
        const httpOptions = {
            headers: new HttpHeaders({ 'content-type': 'application/json' }),
          };
          const body = {"client_id":CLIID,
          "client_secret":CLISEC,
          "audience":AUD,
          "grant_type":"client_credentials"
            }
          console.log(httpOptions);
          return this.http
            .post(`${AUUrl}`, JSON.stringify(body), httpOptions);
    }
    */
    // GET list of public, future events
    public getExams(): Observable<Exam[]>{
        this.resp = this.http.get(`${API_URL}/exams`);
        console.log(this.resp);
        return this.resp;
    }

    saveExam = async (exam: Exam) => {
        /*
        const getting = (value: any): any => {
            this.token = value.access_token;
            console.log(this.token);
            return this.token;
        }
        (await this.getToken()).toPromise().then(getting);

        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
          })
        };
        console.log(httpOptions);*/
        //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + JWT);
        //var httpOptions = {headers: headers_object}; 
        //console.log(JSON.stringify(httpOptions));
        var resp = this.http
        .post(`${API_URL}/exams`, JSON.stringify(exam));
        console.log(resp)
        return resp;
    }
}
