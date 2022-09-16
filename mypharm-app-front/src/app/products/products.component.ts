import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../../services/catalogue.service";
import {Product} from "../model/product.model";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CaddyService} from "../../services/caddy.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  newproducts?: any;
  bestproducts?: any;
  constructor(public catalService:CatalogueService,public authService:AuthenticationService,public route:ActivatedRoute,public router:Router,private caddyService:CaddyService) { }

   ngOnInit(): void {
     this.getProducts("/NewProducts");
     this.getBestProducts("/bestProducts");
     /*console.log(this.newproducts);*/
  }

  private getProducts(url:string) {
    this.catalService.getResource(url).subscribe(
      data=>{this.newproducts=data},
      err=>{console.log(err)}
    );
  }
  private getBestProducts(url:string) {
    this.catalService.getResource(url).subscribe(
      data=>{this.bestproducts=data},
      err=>{console.log(err)}
    );
  }

  onAddProductToCaddy(p:Product) {
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl("/login");
    }
    else{
      this.caddyService.addProduct(p);
      /*console.log("tiiiiw");*/
    }
  }
}
