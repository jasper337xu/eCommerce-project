import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { ProductCategory } from '../model/product-category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductCategoryDataService extends DefaultDataService<ProductCategory> {
  private backendApiUrl = 'http://localhost:8080/api/product-category';

  constructor(http: HttpClient, httpUrlGenerateor: HttpUrlGenerator) {
    super('ProductCategory', http, httpUrlGenerateor);
  }

  retrieveProductCategories(): Observable<any> {
    return this.http.get(this.backendApiUrl);
  }

  //override
  getAll(): Observable<ProductCategory[]> {
    return this.retrieveProductCategories().pipe(
      map(res => res._embedded.productCategory)
    );
  }
}