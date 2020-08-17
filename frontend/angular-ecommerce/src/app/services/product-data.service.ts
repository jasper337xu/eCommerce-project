import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Product, ProductSearch } from '../model/product';
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

  retrieveProducts(productSearch: ProductSearch): Observable<any> {
    let backendApiUrl: string;

    //
    // TODO: handle retrieving page of products from backend
    //
    
    if (productSearch.productCategoryId) {
      backendApiUrl = `${this.baseUrl}/search/findByCategoryId?id=${productSearch.productCategoryId}`;
    }
    else if (productSearch.searchKeyword) {
      backendApiUrl = `${this.baseUrl}/search/findByNameContaining?name=${productSearch.searchKeyword}`;
    }

    return this.http.get(backendApiUrl);
  }

  //override
  getWithQuery(queryParams: QueryParams): Observable<any> {
    const params = {
      pageNumber: queryParams['pageNumber'] ? parseInt(queryParams['pageNumber'].toString()) : 0,
      pageSize: queryParams['pageSize'] ? parseInt(queryParams['pageSize'].toString()) : 0,
      productCategoryId: queryParams['productCategoryId'] ? parseInt(queryParams['productCategoryId'].toString()) : 0,
      searchKeyword: queryParams['searchKeyword'] ? queryParams['searchKeyword'].toString() : '',
    };

    return this.retrieveProducts(params);
    /*
    const categoryId: number = parseInt(queryParams['productCategoryId'].toString());
    const backendApiUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.http.get(backendApiUrl).pipe(
      map(res => res["_embedded"]["products"])
    );
    */
  }

  getById(productId: number): Observable<Product> {
    const backendApiUrl = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(backendApiUrl);
  }
}