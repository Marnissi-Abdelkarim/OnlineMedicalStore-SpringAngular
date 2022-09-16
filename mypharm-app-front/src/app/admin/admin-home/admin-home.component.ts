import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {CatalogueService} from "../../../services/catalogue.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['../../../assets/vendors/fonts/google-font.css','./admin-home.component.css','../../../assets/vendors/styles/core.css'
    ,'../../../assets/vendors/styles/icon-font.css','../../../assets/src/plugins/datatables/css/dataTables.bootstrap4.min.css','../../../assets/src/plugins/datatables/css/responsive.bootstrap4.min.css','../../../assets/vendors/styles/style.css'],


})
export class AdminHomeComponent implements OnInit {
  bestproducts?: any;
  usersnumber;
  productsnumber;
  categoriesnumber;
  ordersnumber;
  constructor(public catalService:CatalogueService,public authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.getBestProducts("/bestProducts");
    this.getNbUsers("/nbusers");
    this.getNbCategories("/nbcategories");
    this.getNbProducts("/nbproducts");
    this.getNbOrders("/nborders");
  }
  private getBestProducts(url:string) {
    this.catalService.getResource(url).subscribe(
      data=>{this.bestproducts=data},
      err=>{console.log(err)}
    );
  }
  private getNbUsers(url:string){
    this.catalService.getResourceString(url).subscribe(
      data=>{this.usersnumber=data},
      err=>{console.log(err)}
    );
  }
  private getNbProducts(url:string){
    this.catalService.getResourceString(url).subscribe(
      data=>{this.productsnumber=data},
      err=>{console.log(err)}
    );
  }
  private getNbCategories(url:string){
    this.catalService.getResourceString(url).subscribe(
      data=>{this.categoriesnumber=data},
      err=>{console.log(err)}
    );
  }
  private getNbOrders(url:string){
    this.catalService.getResourceString(url).subscribe(
      data=>{this.ordersnumber=data},
      err=>{console.log(err)}
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
