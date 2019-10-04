import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Observable } from 'rxjs/observable';
import { ShoppingCart } from '../../models/shoppingCart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: Product;
  @Input() imageUrlValid = true;
  @Input() showCard = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartServ: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartServ.addToCart(product);
  }

  removeFromCart(product) {
    this.cartServ.removeFromCart(product);
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    } else if (this.shoppingCart && !this.shoppingCart.items) {
      return 0;
    } else {
      const item = this.shoppingCart.items[this.product.key];
      return item ? item.quantity : 0;
    }
  }

}
