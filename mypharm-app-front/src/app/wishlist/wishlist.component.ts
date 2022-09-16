import { Component, OnInit } from '@angular/core';
import {Caddy} from "../model/caddy.model";
import {CatalogueService} from "../../services/catalogue.service";
import {Router} from "@angular/router";
import {CaddyService} from "../../services/caddy.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Wishlist} from "../model/wishlist.model";
import {WishlistService} from "../../services/wishlist.service";
import {ItemProduct} from "../model/item-product.model";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public wishlist:Wishlist;


  constructor(public catService:CatalogueService, public router:Router,
              public wishlistService:WishlistService, public authService:AuthenticationService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated())
      this.router.navigateByUrl('/login');
    this.wishlist=this.wishlistService.getWishlist();


    //this.caddyService.loadCaddyFromLocalStorage();

    console.log(this.wishlist);
  }

  onRemoveProductFromWishlist(p: ItemProduct) {
    this.wishlistService.removeProduct(p.id);
    /* this.caddyService.loadCaddyFromLocalStorage();
     this.router.navigateByUrl('/cart');*/
  }
  onWishlist() {
    if(this.authService.userAuthenticated)
      this.wishlistService.loadWishListFromLocalStorage();
    this.router.navigateByUrl('/wishlist');

  }

}
