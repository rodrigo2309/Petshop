import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../models/cart-model';
import { CartUtil } from '../../../utils/cart.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  public cart: Cart = new Cart();

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  public loadCart() {
    this.cart = CartUtil.get();
  }

  public total() {
    let total = 0;
    this.cart.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  public remove(item) {
    let index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  public clear() {
    CartUtil.clear();
    this.loadCart();
  }
}
