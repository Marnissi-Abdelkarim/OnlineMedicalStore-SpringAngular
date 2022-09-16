import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Caddy} from "../app/model/caddy.model";
import {ItemProduct} from "../app/model/item-product.model";

import {Client} from "../app/model/client.model";
import {Product} from "../app/model/product.model";
/*


*/

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  public currentCaddyName:string="Caddy1";
  public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'Caddy1'}];
  public caddies:Map<string,Caddy>=new Map();
  constructor(private authService:AuthenticationService){
    if(this.authService.isAuthenticated()) {
      this.loadCaddyFromLocalStorage();
    }
    else{
      this.caddies[this.currentCaddyName]=new Caddy(this.currentCaddyName);
    }

    this.caddies[this.currentCaddyName].client=new Client(this.authService.userAuthenticated);
    console.log(this.caddies[this.currentCaddyName].client);

  }

  public updateProductToCaddy(id: number, name: string, price: number, quantity: number) :void{
    let caddy1=this.caddies[this.currentCaddyName];
    let item1=caddy1.items[id];


      item1.quantity=quantity;

  }

  public addProductToCaddy(id:number,name:string,price:number,quantity:number):void{
    let caddy=this.caddies[this.currentCaddyName];
    let item=caddy.items[id];
    if(item===undefined) {
      item=new ItemProduct();item.id=id;item.name=name;
      console.log(price);
      item.price=price;item.quantity=quantity;
      caddy.items[id]=item;
    }
    else{

      item.quantity+=quantity;
    }
  }
  public removeProduct(id:number):void{
    let caddy=this.caddies[this.currentCaddyName];
    delete caddy.items[id];
    this.saveCaddy();
  }
  public addProduct(product:Product){
    this.addProductToCaddy(product.id,product.name,product.currentprice,product.quantity)
    this.saveCaddy();
  }
  public updateProduct(product:Product){
    this.updateProductToCaddy(product.id,product.name,product.currentprice,product.quantity)
    this.saveCaddy();
  }

  updateCart(listitem: any) {
    /*for(const key in listitem) {
      console.log(listitem[key]);
    }*/

    for (const key in listitem) {

      this.updateProductToCaddy(listitem[key].id,listitem[key].name,listitem[key].price,listitem[key].quantity);

    }
    this.saveCaddy();




  }

  public loadCaddyFromLocalStorage(){
    let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.userAuthenticated);
    this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
    this.listCaddies.forEach(c=>{
      let cad=localStorage.getItem("myCaddy_"+this.authService.userAuthenticated+"_"+c.name);
      this.caddies[c.name]=cad==undefined?new Caddy(c.name):JSON.parse(cad);
    })
  }
  public getCaddy():Caddy{
    let caddy=this.caddies[this.currentCaddyName];
    return caddy;
  }

  saveCaddy() {
    let caddy=this.caddies[this.currentCaddyName];
    if(this.authService.userAuthenticated)
    localStorage.setItem("myCaddy_"+this.authService.userAuthenticated+"_"+this.currentCaddyName,JSON.stringify(caddy));
  }

  getSize(){
    let caddy=this.caddies[this.currentCaddyName];
    return Object.keys(caddy.items).length;
  }

  emptyCaddy(){
    this.caddies=new Map();
    this.listCaddies=[];
  }

  getTotalCurrentCaddy() {
    let caddy=this.caddies[this.currentCaddyName];
    let total=0;
    for(let key in caddy.items ){
      total+=caddy.items[key].price*caddy.items[key].quantity;
    }
    return total;
  }

  addNewCaddy(c: { num: number; name: string }) {
    this.listCaddies.push(c);
    this.caddies[c.name]=new Caddy(c.name);
    localStorage.setItem("ListCaddies_"+this.authService.userAuthenticated,JSON.stringify(this.listCaddies));
  }

  setClient(client: Client) {
    this.getCaddy().client=client;
    this.saveCaddy();
  }



}
