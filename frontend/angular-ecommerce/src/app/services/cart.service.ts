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
    let alreadyExistsInCart: boolean;
    alreadyExistsInCart = this.cartItems.some(tempItem => tempItem.id === cartItem.id);

    if (alreadyExistsInCart) {
      // increment the quantity of the item
      for (let tempItem of this.cartItems) {
        if (tempItem.id === cartItem.id) {
          tempItem.quantity++;
          break;
        }
      }
    }
    else {
      // add the item to the cartItems
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