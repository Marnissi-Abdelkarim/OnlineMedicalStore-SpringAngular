import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import {ProductsComponent} from "./products/products.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CheckoutInvoiceComponent} from "./checkout-invoice/checkout-invoice.component";
import {WishlistComponent} from "./wishlist/wishlist.component";
import {AdminHomeComponent} from "./admin/admin-home/admin-home.component";
const routes: Routes = [
  { path:"", component:HomeComponent },
  { path:"product-single", component:ProductsingleComponent },
  { path:"cart", component:CartComponent },
  { path:"wishlist", component:WishlistComponent },
  { path:"checkout", component:CheckoutComponent },
 /* { path:"shop", component:ShopComponent },*/
  { path:"dashboard", component:DashboardComponent },
  { path:"order", component:OrdersComponent },
  { path:"login", component:LoginComponent },
  { path:"signup", component:SignupComponent },
  { path:"products", component:ProductsComponent },
  { path:"profile-details", component:ProfileDetailsComponent },
  { path:"address", component:AddressComponent },
  { path:"categories", component:CategoriesComponent },
  { path:"edit-address", component:EditAddressComponent },
  { path:"shop/:p1/:p2", component:ShopComponent },
  {path:"shop",redirectTo: 'shop/1/0',pathMatch: 'full'},
  {path:"product-single/:id", component:ProductsingleComponent},
  {path:"checkoutInvoice", component:CheckoutInvoiceComponent},
  {path:"admin-home", component:AdminHomeComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
