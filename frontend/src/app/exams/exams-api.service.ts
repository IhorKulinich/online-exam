import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from '../env';
import {Exam} from './exams.model';

@Injectable()
export class ExamsApiService {
    private resp: any;

    constructor(private http: HttpClient) {
    }

    // GET list of public, future events
    public getExams(): Observable<Exam[]>{
        this.resp = this.http.get(`${API_URL}/exams`);
        console.log(this.resp);
        return this.resp;
    }
}