import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {CaddyService} from "../../services/caddy.service";
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  lang;
  constructor(public wishlistService:WishlistService,public authService:AuthenticationService,private router:Router,public caddyService:CaddyService) { }

  ngOnInit(): void {
    //console.log(this.authService.jwtToken);
    this.lang=localStorage.getItem('lang')||'en';
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  onCart() {
    if(this.authService.userAuthenticated)
    this.caddyService.loadCaddyFromLocalStorage();
    this.router.navigateByUrl('/cart');

  }
  ChangeLang(lang){
    localStorage.setItem('lang',lang);
    window.location.reload();
      }

  onWishList() {
    if(this.authService.userAuthenticated)
      this.wishlistService.loadWishListFromLocalStorage();
    this.router.navigateByUrl('/wishlist');
  }

  onCnt() {
    if(this.authService.userAuthenticated)
      this.router.navigateByUrl('/contactus');
    else
      this.router.navigateByUrl('/login');

  }
}
