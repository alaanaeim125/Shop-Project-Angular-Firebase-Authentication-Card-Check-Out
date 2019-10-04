import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;
  cart: any;
  subscrption: Subscription;

  constructor(
         route: ActivatedRoute,
         prdServ: ProductService,
         private cartServ: ShoppingCartService) {

    prdServ.getAll()
      .switchMap(prods => {
      this.products = prods;
      return route.queryParamMap;
    })
    // use this instead route.snapshot.params.category because it change more return route.queryParamMap;
     .subscribe(params => {
      this.category = params.get('category');
      this.filterProducts = (this.category) ? this.products.filter(prod => prod.category === this.category) : this.products;
     });

  }

  async ngOnInit() {
     // shoppingCart
     this.subscrption = (await this.cartServ.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscrption.unsubscribe();
  }

}
