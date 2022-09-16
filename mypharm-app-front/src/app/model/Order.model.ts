import {Client} from './client.model';
import {ItemProduct} from './item-product.model';

export class Order {
  public id:number;
  public client:Client={firstname:"",lastname:"",address:"",phoneNumber:"",email:"",username:""};
  public products:Array<ItemProduct>=[];
  public totalAmount:number;
  public date:Date;
  public isPayementConfirmed:boolean=false;
}
