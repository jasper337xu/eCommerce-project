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
  categoryId: string;
  searchMode: boolean;

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
      this.categoryId = this.route.snapshot.paramMap.get('id');
    }
    else {
      // set default to 1
      this.categoryId = '1';
    }
    this.productService.getWithQuery({ productCategoryId: this.categoryId}).subscribe(
      data => {
        this.products = data;
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
