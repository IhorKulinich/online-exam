import { AuthService } from '@auth0/auth0-angular';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Exam} from './exams.model';
import {ExamsApiService} from './exams-api.service';

@Component({
  selector: 'exams',
  template: `
    <div>
      <button routerLink="/new-exam">New Exam</button>
      <button (click)="auth.loginWithRedirect()" *ngIf="!authenticated">Sign In</button>
      <button (click)="auth.logout({ returnTo: 'callback' })" *ngIf="authenticated">Sign Out</button>
      <p *ngIf="authenticated != null">Hello, {{user.name}}</p>
      <ul>
        <li *ngFor="let exam of examsList">
          {{exam.title}}
        </li>
      </ul>
    </div>
  `
})
export class ExamsComponent implements OnInit, OnDestroy {
  examsListSubs!: Subscription;
  examsList!: Exam[];
  authenticated = false;
  user: any;

  constructor(private examsApi: ExamsApiService, public auth: AuthService) { }

  ngOnInit() {
    this.examsListSubs = this.examsApi
      .getExams()
      .subscribe((res: any) => {
          this.examsList = res;
        },
        console.error
      );
      if (this.auth.user$){
          this.authenticated = true;
          this.user = this.auth.user$;
      }
    }

  ngOnDestroy() {
    this.examsListSubs.unsubscribe();
  }
}