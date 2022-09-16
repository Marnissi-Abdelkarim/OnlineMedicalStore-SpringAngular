import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }


    onSignup(newuser: any) {
    this.authService.signup(newuser).subscribe(
      data=>{
        this.authService.login({email:newuser.email,password:newuser.password}).subscribe(
          resp=>{
            //this.mode=0;
            let jwtToken=resp.headers.get('Authorization');
            if(jwtToken!=null)
              this.authService.saveToken(jwtToken);
            this.router.navigateByUrl('/');
            //console.log(resp);

          },
          error => {
            //this.mode=1;
          }
        );
      },
      error => {}
    );
   /* this.loginComp.onLogin(newuser);*/

  }
}
