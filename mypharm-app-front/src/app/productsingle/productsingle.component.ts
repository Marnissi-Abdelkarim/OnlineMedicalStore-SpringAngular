import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../../services/catalogue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {CaddyService} from "../../services/caddy.service";

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {
  product?:any;
  productcategory?:any;
  productcategoryid;
  products;

  constructor(public catalService:CatalogueService,public route:ActivatedRoute,public router:Router,public authService:AuthenticationService,private caddyService:CaddyService) { }

  ngOnInit() {
    let p1= this.route.snapshot.params['id'];
    //console.log(p1);
    this.getProduct('/products/'+p1);
    this.getProductCategory('/productcategory/'+p1);

    this.getProductCategoryId('/productcategoryid/'+p1);
   // console.log(this.productcategoryid);
   // this.getProducts('/categories/'+this.productcategoryid+'/products');
    /*console.log(this.product);*/

  }

  private getProduct(url:string) {
    this.catalService.getResource(url).subscribe(
      data=>{this.product=data/*,console.log(this.product)*/},
      err=>{console.log(err)}
    );
  }
  private getProducts(url:string) {
    this.catalService.getResourceString(url).subscribe(
      data=>{this.productcategoryid=data;console.log("categoiii:"+this.productcategoryid)/*,console.log(this.product)*/},
      err=>{console.log(err)}
    );
    this.catalService.getResource(url).subscribe(
      data=>{this.products=data},
      err=>{console.log(err)}
    );

  }
  private getProductCategory(url:string) {
    this.catalService.getResourceString(url).subscribe(
      data=>{this.productcategory=data;/*,console.log(this.product)*/},
      err=>{console.log(err)}
    );
  }

  private getProductCategoryId(url: string) {
    this.catalService.getResourceString(url).subscribe(
      data=>{this.productcategoryid=data;console.log("categoiii:"+this.productcategoryid)/*,console.log(this.product)*/},
      err=>{console.log(err)}
    );
  }

  onAddProductToCaddy(p: any) {
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl("/login");
    }
    else{
      if(p.quantity<1 || !Number.isInteger(p.quantity)) alert("Please enter a valid quantity ");
      else{
        console.log(p);
      this.caddyService.addProduct(p);}
      /*console.log("tiiiiw");*/
    }
  }
}
