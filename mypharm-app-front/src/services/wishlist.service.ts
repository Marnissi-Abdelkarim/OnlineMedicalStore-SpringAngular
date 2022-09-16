import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Caddy} from "../app/model/caddy.model";
import {Client} from "../app/model/client.model";
import {Wishlist} from "../app/model/wishlist.model";
import {Product} from "../app/model/product.model";
import {ItemProduct} from "../app/model/item-product.model";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlist:Wishlist;
  constructor(private authService:AuthenticationService){
    if(this.authService.isAuthenticated()) {
      this.loadWishListFromLocalStorage();
    }
    else{
      this.wishlist=new Wishlist();
    }



  }

  saveWishlist() {
    let wishlist=this.wishlist;
    if(this.authService.userAuthenticated)
      localStorage.setItem("myWishlist_"+this.authService.userAuthenticated,JSON.stringify(wishlist));
  }

  public loadWishListFromLocalStorage() {

      let cad=localStorage.getItem("myWishlist_"+this.authService.userAuthenticated);

      this.wishlist=cad==undefined?new Wishlist():JSON.parse(cad);

  }
  public getWishlist():Wishlist{
    let wishlist=this.wishlist;
    return wishlist;
  }
  public removeProduct(id:number):void{
    let wishlist=this.wishlist;
    delete wishlist.items[id];
    this.saveWishlist();
  }
  public addProduct(product:Product){
    this.addProductToWishlist(product.id,product.name,product.currentprice,product.quantity)
    this.saveWishlist();
  }

  private addProductToWishlist(id: number, name: string, price: number, quantity: number) {
    let wishlist=this.wishlist;
    let item=wishlist.items[id];
    if(item===undefined) {
      item=new ItemProduct();item.id=id;item.name=name;
      console.log(price);
      item.price=price;
      wishlist.items[id]=item;
    }
    else{


    }
  }
}
