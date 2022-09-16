import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../../services/catalogue.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories?:any;
  constructor(public catalogueservice:CatalogueService) { }

  ngOnInit(): void {
    this.getCategories('/categories');
  }

  private getCategories(url:string) {
    this.catalogueservice.getResource(url).subscribe(
      data=>{this.categories=data,console.log(data)},
      err=>{console.log(err)}
    );
  }

}
