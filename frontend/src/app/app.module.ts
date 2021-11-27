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

/*
      audience: 'https://ihorkulinich.github.io/online-exam/',
      redirectUrl: 'http://localhost:4200/callback',
      scope: 'openid profile manage:exams'

      curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBVcDJiYWdqNGhETFphbzVIWms4VyJ9.eyJpc3MiOiJodHRwczovL2Rldi1sNTZhYnBjei51cy5hdXRoMC5jb20vIiwic3ViIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaWhvcmt1bGluaWNoLmdpdGh1Yi5pby9vbmxpbmUtZXhhbS8iLCJpYXQiOjE2Mzc5OTc4NDQsImV4cCI6MTYzODA4NDI0NCwiYXpwIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWIiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.CF-Im2-auEc2yYPqxxfSKMG_oYW2O9acuzPMBTvU_uEKs-_rBlZG_fozZE4KoCxSxpCMKgMhha5OpXQo9W7S9NYoPG0uW3nlwH8Fx34xHSghCxbf862a5AQuGh8PI85eDW0ndPFSnF8tTtDFjYvAbextSW7h8tycJ_jAqzZbCcXR7EKI7NUPUdGJmrIun72MCx1PaplsIz1C8tZ5teeP8vyQU_2nQjWKqxWt-nvdSrK0rksxQcxRqJ4AK-WBPJKuKjxZ4kiXjvhSPXE2-A4ShMsV-MG7Kw4h3nfcZ5yxDZ3gXtfTK81vmqBK3FT_fyQWwnYjTh4ukqdPS6cXt7W4_w'{
  "title": "Try by token curl",
  "description": "Auth."
}' http://192.168.88.253:5000/exams

eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBVcDJiYWdqNGhETFphbzVIWms4VyJ9.eyJpc3MiOiJodHRwczovL2Rldi1sNTZhYnBjei51cy5hdXRoMC5jb20vIiwic3ViIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaWhvcmt1bGluaWNoLmdpdGh1Yi5pby9vbmxpbmUtZXhhbS8iLCJpYXQiOjE2MzgwNDM5ODUsImV4cCI6MTYzODEzMDM4NSwiYXpwIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWIiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.tdOQu0W33KO3PIa4GOq2lfmAgOOl3Wm6oEA03toW9UswzcMB38pf_gG-P8sh_nkCKI_YpnVgNdm9q8Yv1-0LuSiXEeIfgBaCyjfGRJiODq3-81mSy8TmRhqgN_uZsGpQnMDmX7jVVhIR-MZMq-u12RnqSDMpafIk_HUrYY4KFd4NCvjvPbK5H9Df5FoeSW8AqEq9HsnQV4If1Mo1hfQU18ccbG3ISmuzKBCI6q8m6m_mMkxUNAOW62Ft0hAeTbxedKGqHIgPU1lpEpXciIXiyl4-dmMm41ttcpzaRLelWZVP2JTyYhVt-MYxKHaZjbdIJkSOz3KFIYNqkD7OUiUnMw


curl -X POST -H 'Content-Type: application/json' -d '{"client_id":"5YH8Gx0Tr0EYXgjspiRglBVmiLd8gAib","client_secret":"twqxboplz5wtLFAPgCgAlMdQq4B1d1Db5X_ry2MmEchfxpMvwuyGeRZ9QH7Pmv40","audience":"https://ihorkulinich.github.io/online-exam/","grant_type":"client_credentials"}' https://dev-l56abpcz.us.auth0.com/oauth/token

curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBVcDJiYWdqNGhETFphbzVIWms4VyJ9.eyJpc3MiOiJodHRwczovL2Rldi1sNTZhYnBjei51cy5hdXRoMC5jb20vIiwic3ViIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaWhvcmt1bGluaWNoLmdpdGh1Yi5pby9vbmxpbmUtZXhhbS8iLCJpYXQiOjE2MzgwNDQ4MDcsImV4cCI6MTYzODEzMTIwNywiYXpwIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWIiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.USXs7vuUoWsUwqjb-u5OFXtRfj0hfSgNYI_uDLDdPK7Icllr39k990nCayOum3ZoJO-9-kAmCaDloN6kTvsvydxEWbvMxwAJb03MWqQcNjh3OMES7YeEsY7qkbQ4uysaU4MLhud7t4j1c0pVfIYFAO_iNdhR_dFxoNitxW1vCscoADLhJCCko6dU1Q1NVumWHPjDuXpgFB51lw69z0wNbIDg7VdqUYfMI37cCMghPgUhQ7z5tWLhwdzNq_zM7NE9g18MCjcX9JVUYehukgPeFvSnuTiuDfSSplLTP2KxgDErOGrlCKXeGO8tjnjbFLDAL-mncmuqNH3_6r5YJCmHMw' -d '{"title": "Try by token curl","description": "Auth."}' http://192.168.88.253:5000/exams

export const API_URL = 'http://192.168.88.253:5000';
export const JWT="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBVcDJiYWdqNGhETFphbzVIWms4VyJ9.eyJpc3MiOiJodHRwczovL2Rldi1sNTZhYnBjei51cy5hdXRoMC5jb20vIiwic3ViIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaWhvcmt1bGluaWNoLmdpdGh1Yi5pby9vbmxpbmUtZXhhbS8iLCJpYXQiOjE2Mzc5OTc4NDQsImV4cCI6MTYzODA4NDI0NCwiYXpwIjoiNVlIOEd4MFRyMEVZWGdqc3BpUmdsQlZtaUxkOGdBaWIiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.CF-Im2-auEc2yYPqxxfSKMG_oYW2O9acuzPMBTvU_uEKs-_rBlZG_fozZE4KoCxSxpCMKgMhha5OpXQo9W7S9NYoPG0uW3nlwH8Fx34xHSghCxbf862a5AQuGh8PI85eDW0ndPFSnF8tTtDFjYvAbextSW7h8tycJ_jAqzZbCcXR7EKI7NUPUdGJmrIun72MCx1PaplsIz1C8tZ5teeP8vyQU_2nQjWKqxWt-nvdSrK0rksxQcxRqJ4AK-WBPJKuKjxZ4kiXjvhSPXE2-A4ShMsV-MG7Kw4h3nfcZ5yxDZ3gXtfTK81vmqBK3FT_fyQWwnYjTh4ukqdPS6cXt7W4_w";
export const AUUrl="https://dev-l56abpcz.us.auth0.com/oauth/token";
export const CLIID = "5YH8Gx0Tr0EYXgjspiRglBVmiLd8gAib";
export const CLISEC = "twqxboplz5wtLFAPgCgAlMdQq4B1d1Db5X_ry2MmEchfxpMvwuyGeRZ9QH7Pmv40";
export const AUD = "https://ihorkulinich.github.io/online-exam/"

*/