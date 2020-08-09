import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';
import { ProductCategory } from '../model/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // urls of Spring Boot Rest API
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category'

  constructor(private httpClient: HttpClient) { }


  getProductListByCategory(categoryId: number): Observable<Product[]> {

    const backendApiUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.retrieveProductsFromBackend(backendApiUrl);
  }

  getProductListByKeyword(keyword: string): Observable<Product[]> {

    const backendApiUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.retrieveProductsFromBackend(backendApiUrl);
  }

  // Refactor the repetitive code that is used to retrieve products from backend API
  private retrieveProductsFromBackend(backendApiUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(backendApiUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductDetails(productId: number): Observable<Product> {
    const backendApiUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(backendApiUrl);
  }
}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
