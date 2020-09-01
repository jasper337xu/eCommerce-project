import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/model/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.retrieveSelectedProduct();
  }

  retrieveSelectedProduct() {
    const productId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getByKey(productId).subscribe(
      data => {
        this.product = data;
      }
    )
    /*
    const productId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductDetails(productId).subscribe(
      data => {
        this.product = data;
      }
    );
    */
  }

  addToCart() {
    console.log(`Item added to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}
