import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../../services/catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Product} from "../model/product.model";
import {CaddyService} from "../../services/caddy.service";
import {AuthenticationService} from "../../services/authentication.service";
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products?: any;
  newproducts?: any;
  categories?:any;

  totalLength?:number;
  page:number=1;
  constructor(public wishlistService:WishlistService,public authService:AuthenticationService,public catalService:CatalogueService,public route:ActivatedRoute,public router:Router,private caddyService:CaddyService) { }

  ngOnInit(): void {
   // console.log("io");
    this.getNewProducts('/NewProducts');
    this.getCategories('/categories');
    this.router.events.subscribe((val)=>{
     /* console.log("io");*/
      if (val instanceof NavigationEnd){
        let url=val.url;
        /*console.log(val);*/
        //console.log(this.route.snapshot.data['asdf']);
        let p1= this.route.snapshot.params['p1'];
        if(p1==1){
          this.getProducts('/NewProducts');
        }
        else if(p1==2)
        {
          let idCat= this.route.snapshot.params['p2'];
          this.page=1;
          this.getProducts('/categories/'+idCat+'/products');
        }
      }});
    let p1= this.route.snapshot.params['p1'];
    if(p1==1){
      this.getProducts('/NewProducts');
    }
    else if(p1==2)
    {
      let idCat= this.route.snapshot.params['p2'];
      this.page=1;
      this.getProducts('/categories/'+idCat+'/products');
    }
  }

  private getCategories(url:string) {
    this.catalService.getResource(url).subscribe(
      data=>{this.categories=data,console.log(data)},
      err=>{console.log(err)}
    );
  }

  private getProducts(url:string) {
    this.catalService.getResource(url).subscribe(
      data=>{this.products=data,console.log(data),this.totalLength=this.products.length;},
      err=>{console.log(err)}
    );
  }

  private getNewProducts(url:string) {
    this.catalService.getResource(url).subscribe(
      data=>{this.newproducts=data,console.log(data)},
      err=>{console.log(err)}
    );
  }

  private getProductsOnSearch(value: any) {
    this.catalService.getResource('/productsbyname?mc='+value.searchV).subscribe(
      data=>{this.products=data,this.totalLength=this.products.length;this.page=1;},error => {console.log(error)}
    )

  }

  onSearch(value: any) {
/*
    this.router.navigateByUrl('/')
*/
    this.getProductsOnSearch(value);

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

  onAddProductToWishList(p: Product) {
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl("/login");
    }
    else{
      this.wishlistService.addProduct(p);
      /*console.log("tiiiiw");*/
    }

  }
}
