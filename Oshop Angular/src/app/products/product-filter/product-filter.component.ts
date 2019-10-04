import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  @Input() category: string;
  categories$;

  constructor(catServ: CategoryService) {
    this.categories$ = catServ.getCategories();
  }

  ngOnInit() {
  }

}
