import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs/observable';
import { ShoppingCart } from '../models/shoppingCart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  constructor(private cartServ: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartServ.getCart();
  }

  addToCart(product: Product) {
    this.cartServ.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartServ.removeFromCart(product);
  }

  clearCart() {
    this.cartServ.clearCart();
  }

}
