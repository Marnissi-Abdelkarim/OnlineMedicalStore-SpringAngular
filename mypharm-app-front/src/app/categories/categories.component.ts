import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../../services/catalogue.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
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
