//import * as Auth0 from 'auth0-web';
import { AuthModule } from '@auth0/auth0-angular';
import { JwtModule } from "@auth0/angular-jwt";
import {CallbackComponent} from './callback.component';
//import {AuthInterceptor} from "./exams/interceptor.service"
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ExamsApiService} from './exams/exams-api.service';

import {ExamFormComponent} from './exams/exam-form.component';
import {RouterModule, Routes} from '@angular/router';
import {ExamsComponent} from './exams/exams.component';

const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'new-exam', component: ExamFormComponent },
  { path: '', component: ExamsComponent },
];

export function tokenGetter() {
  var token = localStorage.getItem("access_token");
  console.log(token);
  token = token == null ? "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBVcDJiYWdqNGhETFphbzVIWms4VyJ9.eyJpc3MiOiJodHRwczovL2Rldi1sNTZhYnBjei51cy5hdXRoMC5jb20vIiwic3ViIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaWhvcmt1bGluaWNoLmdpdGh1Yi5pby9vbmxpbmUtZXhhbS8iLCJpYXQiOjE2Mzc5OTc4NDQsImV4cCI6MTYzODA4NDI0NCwiYXpwIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWIiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.CF-Im2-auEc2yYPqxxfSKMG_oYW2O9acuzPMBTvU_uEKs-_rBlZG_fozZE4KoCxSxpCMKgMhha5OpXQo9W7S9NYoPG0uW3nlwH8Fx34xHSghCxbf862a5AQuGh8PI85eDW0ndPFSnF8tTtDFjYvAbextSW7h8tycJ_jAqzZbCcXR7EKI7NUPUdGJmrIun72MCx1PaplsIz1C8tZ5teeP8vyQU_2nQjWKqxWt-nvdSrK0rksxQcxRqJ4AK-WBPJKuKjxZ4kiXjvhSPXE2-A4ShMsV-MG7Kw4h3nfcZ5yxDZ3gXtfTK81vmqBK3FT_fyQWwnYjTh4ukqdPS6cXt7W4_w" : token; 
  console.log(token);
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    ExamFormComponent,
    ExamsComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    AuthModule.forRoot({
      domain: 'dev-l56abpcz.us.auth0.com',
      clientId: 'QLXO3Rthnj60YXdcO9Xd5XW7cypBOdyj'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/new-exam"],
        disallowedRoutes: ["http://localhost:4200/"],
        authScheme: (request: any) => {
          if ( ! request.url.includes("new-exam")) {
            return "Basic ";
          }
     
          return "Bearer "+tokenGetter;
        },
      },
    }),
  ],
  providers: [//{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ExamsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
