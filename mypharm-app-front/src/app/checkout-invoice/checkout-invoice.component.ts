import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {AuthenticationService} from "../../services/authentication.service";
import {CaddyService} from "../../services/caddy.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-invoice',
  templateUrl: './checkout-invoice.component.html',
  styleUrls: ['./checkout-invoice.component.css']
})
export class CheckoutInvoiceComponent implements OnInit {

  constructor(public orderService:OrderService,
              private authService:AuthenticationService,
              public caddyService:CaddyService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onOrder() {
    this.orderService.submitOrder().subscribe(data=>{
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
      //this.panelStyle="panel-success";
    },err=>{
      console.log(err);
    });

    window.alert("THANK YOU, your order is on the way !");
  }
  onConfirmPayment() {
    this.orderService.ConfirmOrderPayment(this.orderService.order.id).subscribe(data=>{
      if(this.orderService.order.isPayementConfirmed==false){
      this.orderService.order.isPayementConfirmed=true;
      window.alert("THANK YOU FOR YOUR PURCHASE!")}
    })
  }

  onPayOrder() {
    this.router.navigateByUrl("/payment/"+this.orderService.order.id);
  }


}
