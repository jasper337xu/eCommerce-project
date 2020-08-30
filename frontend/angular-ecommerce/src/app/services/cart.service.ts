import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  // use Subject to publish events that will be sent to all subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    // check if we already have the item in our cart
    let existingCartItem: CartItem = undefined;
    existingCartItem = this.cartItems.find(tempItem => tempItem.id === cartItem.id);

    if (existingCartItem != undefined) {
      // the item already exists in the cart, increment the quantity of the item
      existingCartItem.quantity++;
    }
    else {
      // the item does not exist in the cart, add the item to the cart
      this.cartItems.push(cartItem);
    }

    // publish events to all subscribers
    this.publishTotals();
  }

  publishTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempItem of this.cartItems) {
      totalPriceValue += tempItem.unitPrice * tempItem.quantity;
      totalQuantityValue += tempItem.quantity;
    }

    // publish total values to all subscribers that will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    console.log(`totalPrice:`, totalPriceValue);
    console.log(`totalQuantity:`, totalQuantityValue);
  }
}