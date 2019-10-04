import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }



  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products')
           .snapshotChanges()
           .pipe(
             map(changes =>
                changes.map(prd => {
                  const data = prd.payload.val() as Product;
                  const key = prd.payload.key;
                  return { key, ...data };
                })
                )
           );
}

  getProduct(prodId) {
    return this.db.object('/products/' + prodId);
  }

  updateProduct(prodId, product) {
    return this.db.object('/products/' + prodId).update(product);
  }

  deleteProduct(prodId) {
    return this.db.object('/products/' + prodId).remove();
  }
}
