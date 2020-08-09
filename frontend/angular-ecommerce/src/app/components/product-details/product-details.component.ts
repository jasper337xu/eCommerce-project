import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  productId: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductDetails(this.productId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

}
