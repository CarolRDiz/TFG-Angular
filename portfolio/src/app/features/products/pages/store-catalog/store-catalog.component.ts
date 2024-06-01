import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../product';
import { Category } from '../../category';
import { environment } from 'src/app/environments/environment';
import { LazyImgDirective } from '../../../../shared/directives/lazy-img.directive';
import { NgFor } from '@angular/common';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CategoriesService } from '../../categories.service';
import { ProductService } from 'src/app/features/admin-products/product.service';

@Component({
    selector: 'app-store-catalog',
    templateUrl: './store-catalog.component.html',
    styleUrls: ['./store-catalog.component.scss'],
    standalone: true,
    imports: [SearchBarComponent, SelectComponent, NgFor, RouterLink, LazyImgDirective]
})
export class StoreCatalogComponent {
  products: Product[];
  productsFiltered: Product[];
  categories: Category[];
  category: string = '';
  predetermined: string = 'Todas';
  searchValue: string ='';
  imageUrl = environment.urlApiImage;

  constructor(
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoriesService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getFilterProducts();
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data
    })
  }
  getFilterProducts() {
    this.productService.getFilterProducts(this.category).subscribe((data) => {
      this.products = data;
      this.productsFiltered = data;
    })
  }
  search(value: any) {
    this.searchValue = value;
    this.productsFiltered = this.products.filter((product) => product.name.includes(value));
  }
  selectCategory(value: any) {
    if (value == this.predetermined) {
      this.category = "";
    } else {
      console.log(value)
      this.category = value;
    }
    this.getFilterProducts();
  }
}
