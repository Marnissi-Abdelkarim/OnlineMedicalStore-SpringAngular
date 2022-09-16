import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {CaddyService} from "../../services/caddy.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit {
  mode:number=0;
  constructor(private authService:AuthenticationService,private router:Router,private caddyService:CaddyService) { }

  ngOnInit(): void {
  }

  onLogin(user:any) {
    console.log(user);
    this.authService.login(user).subscribe(
      resp=>{
        this.mode=0;
        let jwtToken=resp.headers.get('Authorization');
        if(jwtToken!=null){
          this.authService.saveToken(jwtToken);
          }
        this.caddyService.loadCaddyFromLocalStorage();
        if(this.authService.isAdmin())
        this.router.navigateByUrl('/admin-home');
        else
        this.router.navigateByUrl('/');
        //console.log(resp);

      },
      error => {
        this.mode=1;
      }
    );
  }
}
