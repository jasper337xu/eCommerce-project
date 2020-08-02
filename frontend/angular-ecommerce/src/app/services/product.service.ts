import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // url of Spring Boot Rest API
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }


  getProductListByCategory(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}


interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
