import {Product} from './product.model';
import {Client} from "./client.model";
import {ItemProduct} from "./item-product.model";


export class Wishlist{
  constructor(){}
  public items:Map<number,ItemProduct>=new Map();

}
