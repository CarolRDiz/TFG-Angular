import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Product } from '../../product';

@Component({
  selector: 'app-store-catalog',
  templateUrl: './store-catalog.component.html',
  styleUrls: ['./store-catalog.component.scss']
})
export class StoreCatalogComponent {
  productService: ProductService = inject(ProductService);
  products: Product[];

  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    })
  }
}
