import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {


  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  lenArrayProductsFiltered: number;
  lenArrayproduct: number;


  constructor(private prodServ: ProductService) {
   this.subscription = this.prodServ.getAll()
    .subscribe(prods => {
        this.filteredProducts = this.products = prods;
        this.lenArrayProductsFiltered = this.lenArrayproduct = this.filteredProducts.length;
      });
  }



  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
