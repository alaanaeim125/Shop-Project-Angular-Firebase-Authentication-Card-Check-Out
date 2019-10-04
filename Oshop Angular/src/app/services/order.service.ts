import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularFire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartServ: ShoppingCartService) { }

   storeOrder(order) {
    const res = this.db.list('/orders').push(order);
    // this.cartServ.clearCart();
    return res;
  }
}
