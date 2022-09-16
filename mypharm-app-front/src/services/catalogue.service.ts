import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string="http://localhost:8083";
  constructor(private http:HttpClient) {

  }
  public getResource(url:any){
    return this.http.get(this.host+url);
  }

  public getResourceString(url:any){
    return this.http.get(this.host+url,{responseType: 'text'});
  }



}

