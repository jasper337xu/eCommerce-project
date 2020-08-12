import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductDataService extends DefaultDataService<Product> {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Product', http, httpUrlGenerator);
  }

  //override
  getWithQuery(queryParams: QueryParams): Observable<Product[]> {
    const categoryId: number = parseInt(queryParams['productCategoryId'].toString());
    const backendApiUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.http.get(backendApiUrl).pipe(
      map(res => res["_embedded"]["products"])
    );
  }
}