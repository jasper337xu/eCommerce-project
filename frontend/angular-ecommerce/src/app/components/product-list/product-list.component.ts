import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  categoryId: number;
  previousCategoryId: number = 1;
  searchMode: boolean;
  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private productService: ProductService,
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

    this.productService.getWithQuery({ 
      pageNumber: this.pageNumber.toString(),
      pageSize: this.pageSize.toString(),
      productCategoryId: this.categoryId.toString()
    }).subscribe(
      data => {
        this.products = data['_embedded']['products'];
        this.pageNumber = data['page']['number'] + 1;
        this.pageSize = data['page']['size'];
        this.totalElements = data['page']['totalElements'];
      }
    )
    /*
    this.productService.getProductListByCategory(this.categoryId).subscribe(
      data => {
        this.products = data;
      }
    )
    */
  }

  
  retrieveProductsByKeyword(): void {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    this.productService.getWithQuery({searchKeyword: keyword}).subscribe(
      data => {
        this.products = data;
      }
    )
    /*
    this.productService.getProductListByKeyword(keyword).subscribe(
      data => {
        this.products = data;
      }
    )
    */
  }

}
