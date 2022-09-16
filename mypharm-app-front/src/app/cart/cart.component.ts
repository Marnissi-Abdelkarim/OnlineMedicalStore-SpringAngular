import { Component, OnInit } from '@angular/core';

import {Product} from '../model/product.model';
import {Router} from '@angular/router';

import {ItemProduct} from '../model/item-product.model';
import {Caddy} from '../model/caddy.model';
import {CatalogueService} from "../../services/catalogue.service";
import {CaddyService} from "../../services/caddy.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public caddy:Caddy;


  constructor(public catService:CatalogueService, public router:Router,
              public caddyService:CaddyService, public authService:AuthenticationService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated())
      this.router.navigateByUrl('/login');
    this.caddy=this.caddyService.getCaddy();


   //this.caddyService.loadCaddyFromLocalStorage();

    console.log(this.caddy);
  }





  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
   /* this.caddyService.loadCaddyFromLocalStorage();
    this.router.navigateByUrl('/cart');*/
  }

  getTotal() {
    return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl("/checkout");
  }

  onAddCaddy() {

    let size=this.caddyService.listCaddies.length;
    let index:number=this.caddyService.listCaddies[size-1].num;
    this.caddyService.addNewCaddy({num:index+1,name:"Caddy"+(index+1)});
  }

  onSelectCaddy(c: { num: number; name: string }) {
    this.caddyService.currentCaddyName=c.name;
    this.caddy=this.caddyService.getCaddy();
  }
  onCart() {
    if(this.authService.userAuthenticated)
      this.caddyService.loadCaddyFromLocalStorage();
    this.router.navigateByUrl('/cart');

  }

  onUpdateCart(value: any) {
    let a=0;
    for (const key in value) {
      if(value[key].quantity<1 || !Number.isInteger(value[key].quantity)) {a=1; alert("Please enter a valid quantity ");
    }}

      /*console.log(value);*/
    if(a==0)
    this.caddyService.updateCart(value);
    /*console.log(this.caddy);*/

  }
}
