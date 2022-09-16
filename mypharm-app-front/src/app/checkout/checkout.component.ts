import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {CaddyService} from "../../services/caddy.service";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {Client} from "../model/client.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products=[];
  public mode:number=0;
  panelStyle:string= "panel-default";
  constructor(public orderService:OrderService,
              private authService:AuthenticationService,
              public caddyService:CaddyService,
              private router:Router) { }

  ngOnInit(): void {
    for(let key in this.caddyService.getCaddy().items){
      this.products.push(this.caddyService.getCaddy().items[key]);
    }

  }

  onSaveCheckout(client:Client) {
    client.username=this.authService.userAuthenticatedName;
    console.log(this.authService.userAuthenticated);
    this.orderService.setClient(client);
    this.caddyService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    console.log(client);
    this.router.navigateByUrl('/checkoutInvoice')
  }

}
