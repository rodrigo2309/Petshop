import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { ProductCardComponent } from '../../../components/store/product-card/product-card.component';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [NgFor, CommonModule, ProductCardComponent],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  public products$!: Observable<Product[]>;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.products$ = this.data.getProducts();
  }
}
