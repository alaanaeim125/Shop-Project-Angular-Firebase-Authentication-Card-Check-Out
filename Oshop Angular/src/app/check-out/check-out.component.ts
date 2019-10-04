import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { Product } from '../models/product';
import { AuthService } from '../services/auth.service';
import { ShoppingCart } from '../models/shoppingCart';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cartSubscription: Subscription;
  userSubscription: Subscription;
  cartt: ShoppingCart;
  userId: string;
  usernameOrder: string;
  product: Product;
  quantity: number;
  item: {};
  AllItems: any[] = [];
  totalPrice: number;
  totoalPriceForAllProduct: number;
  totoalQuantityForAllProduct: number;
  productIds: string[];
  cart$;
  constructor(
              private router: Router,
              private shoppingCartServ: ShoppingCartService,
              private orderServ: OrderService,
              private authServ: AuthService
              ) { }

  async ngOnInit() {

    this.userSubscription = this.authServ.username$.subscribe(user => this.userId = user.uid);

    this.cart$ = await this.shoppingCartServ.getCart();
    this.cartSubscription = this.cart$.subscribe(cart => {
      this.cartt = cart;
      this.productIds = Object.keys(cart.items);
      this.totoalPriceForAllProduct = 0;
      this.totoalQuantityForAllProduct = 0;
      // tslint:disable-next-line: forin
      for (const productId of this.productIds) {
        this.product = {
          title: cart.items[productId].product.title,
          imageUrl: cart.items[productId].product.imageUrl,
          price: cart.items[productId].product.price,
          key: cart.items[productId].product.key,
          category: cart.items[productId].product.category
        };
        this.quantity = cart.items[productId].quantity;
        this.totalPrice = cart.items[productId].quantity * cart.items[productId].product.price;

        this.totoalPriceForAllProduct += cart.items[productId].quantity * cart.items[productId].product.price;
        this.totoalQuantityForAllProduct += cart.items[productId].quantity;
        this.item = {product: this.product, quantity: this.quantity, totalPrice: this.totalPrice };
        this.AllItems.push(this.item);
      }
    });
  }


  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  PlaceOrder(form) {

    const order = {
      userId: this.userId,
      dateCreated: new Date().getTime(),
      shipping: form,
      items: this.AllItems
    };
    const res = this.orderServ.storeOrder(order);
    this.router.navigate(['/order-success/' + res.key]);
  }
}
