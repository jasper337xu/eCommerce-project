import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  categoryId: number;
  searchMode: boolean;
  // properties for pagination
  pageNumber: number = 1;
  readonly pageSize: number = 8;
  totalElements: number = 0;
  previousCategoryId: number = 1;
  previousKeyword: string = null;

  constructor(private productService: ProductService,
              private productDataService: ProductDataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.retrieveProducts();
    });
  }

  retrieveProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.retrieveProductsByKeyword();
    }
    else {
      this.retrieveProductsByCategory();
    }
  }


  retrieveProductsByCategory(): void {
    // check if the route has id
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.categoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // set default to 1
      this.categoryId = 1;
    }

    // if we have a different category id than previous, then set pageNumber back to 1
    if (this.previousCategoryId != this.categoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.categoryId;

    // retrieve (a page of) products by category from backend API
    this.productService.getWithQuery({ 
      pageNumber: this.pageNumber.toString(),
      pageSize: this.pageSize.toString(),
      productCategoryId: this.categoryId.toString()
    }).subscribe(
      data => {
        this.products = data;
      }
    );

    // retrieve pagination info from backend API
    this.productDataService.getPageInfo({
      pageNumber: this.pageNumber.toString(),
      pageSize: this.pageSize.toString(),
      productCategoryId: this.categoryId.toString()
    }).subscribe(
      info => {
        this.pageNumber = info['number'] + 1;
        this.totalElements = info['totalElements'];
      }
    );
  }
  
  retrieveProductsByKeyword(): void {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than previous, then set pageNumber back to 1
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyword;

    // retrieve (a page of) products by keyword from backend API
    this.productService.getWithQuery({
      pageNumber: this.pageNumber.toString(),
      pageSize: this.pageSize.toString(),
      searchKeyword: keyword
    }).subscribe(
      data => {
        this.products = data;
      }
    )

    // retrieve pagination info from backend API
    this.productDataService.getPageInfo({
      pageNumber: this.pageNumber.toString(),
      pageSize: this.pageSize.toString(),
      searchKeyword: keyword
    }).subscribe(
      info => {
        this.pageNumber = info['number'] + 1;
        this.totalElements = info['totalElements'];
      }
    );
  }

  addToCart(product: Product): void {
    //
    //TODO
    //
  }
}
