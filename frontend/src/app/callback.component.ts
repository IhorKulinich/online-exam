import { AuthService } from '@auth0/auth0-angular';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'callback',
  template: `
    <div>Loading authentication details...</div>
  `,
})
export class CallbackComponent implements OnInit {
    auth:  AuthService ;
    constructor(private router: Router, public auther: AuthService ) { 
        this.auth = auther;
    }

    ngOnInit(): void {
        const self = this;
        const handle = async ( auth: AuthService ) => {
            if (auth.user$){
                self.router.navigate(['/']);
            }
        }
        handle(this.auth);
    }
}