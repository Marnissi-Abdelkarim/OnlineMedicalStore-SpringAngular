
import {ItemProduct} from '../app/model/item-product.model';
import {CaddyService} from './caddy.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from './catalogue.service';
import {Order} from '../app/model/Order.model';
import {Observable} from 'rxjs';
import {Client} from "../app/model/client.model";
@Injectable({
  providedIn:'root'
})
export class OrderService {
  public order:Order=new Order();

  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient,
              private catalService:CatalogueService){}

  public setClient(client:Client){
    this.order.client=client;
  }
  public confirmPayment(){
    this.order.isPayementConfirmed=true;
  }
  public loadProductsFromCaddy(){
    this.order.products=[];
   for(let key in this.caddyService.getCaddy().items){
     this.order.products.push(this.caddyService.getCaddy().items[key]);
   }
  }
  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity;
    });
    return total;
  }

  submitOrder() {
    return this.httpClient.post(this.catalService.host+"/orders",this.order);
  }
  ConfirmOrderPayment(id:number){
    return this.httpClient.get(this.catalService.host+"/order/"+id);
  }

  public getOrder(id:number):Observable<Order>{
    return this.httpClient.get<Order>(this.catalService.host+"/orders/"+id);
  }
}
