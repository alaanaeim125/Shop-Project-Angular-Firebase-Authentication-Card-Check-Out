import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$;
  // make empty when you add new product see empty object not data to load
  selectProduct = {};
  iid;

  constructor(
              private prodSer: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private catSer: CategoryService) {

    this.categories$ = catSer.getCategories();


    this.iid = this.route.snapshot.params.id;

    if (this.iid) {
      // this.selectProduct = this.prodSer.getProduct(iid).snapshotChanges();
       this.prodSer.getProduct(this.iid).valueChanges().subscribe(prod => this.selectProduct = prod);
    }

  }

  async save(product) {
    if (this.iid) {
      this.prodSer.updateProduct(this.iid, product);
      this.router.navigate(['/admin/products']);
    } else {
    this.prodSer.create(product);
    this.router.navigate(['/admin/products']);
    }
  }

  deleteProductt() {
    if (confirm('Are You Sure To Want Delete Product ? ')) {
      this.prodSer.deleteProduct(this.iid);
      this.router.navigate(['/admin/products']);
    } else {
      return;
    }
  }

  ngOnInit() {
  }

}
