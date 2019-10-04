import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import { ShoppingCartItems } from '../models/shoppingCartItems';
import { ShoppingCart } from '../models/shoppingCart';
import { Observable } from 'Rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    if (cartId && this.db.object('/shopping-carts/' + cartId + '/items')) {
      return this.db.object('/shopping-carts/' + cartId)
    .valueChanges()
    .map((x: ShoppingCart) => new ShoppingCart(x.items));
    }
  }

  // Function return Promise
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

   async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    } else {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

  async addToCart(product: Product) {
    await this.updateCart(product, 1);
  }

  removeFromCart(product: Product) {
     this.updateCart(product, -1);
  }

  private async updateCart(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe((item: ShoppingCartItems) => {
      if (item) {
        // tslint:disable-next-line: no-string-literal
        item$.update({product, quantity: item.quantity + change });
        // tslint:disable-next-line: no-string-literal
        const quantity = (item.quantity + change);
        if (quantity === 0) {
          item$.remove();
        }
      } else {
        item$.set({product, quantity: 1});
      }
    });
  }


  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
}
