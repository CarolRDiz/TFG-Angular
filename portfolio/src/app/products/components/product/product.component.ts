import { Component, TemplateRef, Input, inject, HostListener, EventEmitter, Output, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { CartService } from '../../services/cart.service';
import { environment } from 'src/app/environments/environment';
import { DOCUMENT, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LazyImgDirective } from '../../../shared/directives/lazy-img.directive';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    standalone: true,
    imports: [LazyImgDirective, NgFor, MatIconModule, NgIf, RouterLink]
})
export class ProductComponent {

  @Output() closeEvent = new EventEmitter();

  id: number;
  product: Product;
  selectedImage: string;
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  confirmationOn: boolean = false;
  imageUrl = environment.urlApiImage;

  constructor(@Inject(DOCUMENT) private document: Document,
    protected renderer: Renderer2,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnDestroy(){
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductById(this.id).subscribe((data) => {
      this.product = data;
      this.selectedImage = this.product.thumbnail_image_id;
    });
  }
  addToCart(id: number){
    this.cartService.addToCart(id, 1);
    this.confirmationOn = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }
  selectImage(image_id: string) {
    console.log
    this.selectedImage = image_id;
  }
  
  close(): void {
    this.confirmationOn = false;
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }
}
