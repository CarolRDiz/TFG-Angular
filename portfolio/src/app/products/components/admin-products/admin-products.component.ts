
import { Component, inject } from '@angular/core';
import { Illustration } from 'src/app/illustrations/illustration';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  productsList: Product[] = [];
  illustrationListModified: Illustration[];
  visibilitySort: Boolean = false;
  nameSort: Boolean = false;
  illustrationSelectedArray: Number[] = [];
  imageUrl = environment.urlApiImage;

  constructor(
    private productService: ProductService,

    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getProducts();
    // this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
    //   this.illustrationList = illustrations;
    //   this.illustrationListModified = illustrations;
    // }
    // )
  }
  // SERVICES
  // illustrationService: IllustrationService = inject(IllustrationService);

  // METHODS
  getProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.productsList = data;
    })
    // this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
    //   this.illustrationList = illustrations;
    //   this.illustrationListModified = illustrations;
    // })
  }

  editar(id: Number) {
    this.router.navigate(['/', 'admin', 'edit-product', id])
  }

  sortVisibility() {
    this.visibilitySort = !this.visibilitySort
    // this.illustrationList.sort((a, b) => (a.name > b.name ) ? 1 : -1)
    this.illustrationListModified.sort((a, b) => (a.visibility == this.visibilitySort) ? 1 : -1)
  }
  sortName() {
    this.nameSort = !this.nameSort
    if (this.nameSort) {
      this.illustrationListModified.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    else {
      this.illustrationListModified.sort((a, b) => (a.name < b.name) ? 1 : -1)
    }
  }
  search(value: any) {
    // let illustrationListWithName = this.illustrationList.map((illustration) => {
    //   if (!illustration.name) {
    //     illustration.name = '';
    //   }
    //   return illustration;
    // })
    // this.illustrationListModified = illustrationListWithName.filter((illustration) => illustration.name.includes(value));
  }
  async deleteIllustration(id: any) {
    // let success;
    // await this.illustrationService.deleteIllustration(id)
    //   .then(({ status }) => {
    //     console.log(status);
    //     success = true;
    //   }
    //   );
    // if (success) {
    //   this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
    //     this.illustrationList = illustrations;
    //     this.illustrationListModified = illustrations;
    //   }
    //   )
    // }
  }
  async deleteIllustrationList() {
    // //TODO
    // // ARE YOU SURE
    // let success;
    // await this.illustrationService.deleteIllustrationList(this.illustrationSelectedArray)
    //   .then(({ status }) => {
    //     console.log(status);
    //     success = true;
    //   }
    //   );
    // if (success) {
    //   this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
    //     this.illustrationList = illustrations;
    //     this.illustrationListModified = illustrations;
    //     this.illustrationSelectedArray = [];
    //   }
    //   )
    // }
  }

  //TODO
  //SELECTED ILLUSTRATIONS
  onIllustrationPressed($event: any) {
    let id: string = $event.source.value;
    if ($event.checked) {
      this.illustrationSelectedArray.push(parseInt(id));
    }
    else {
      this.illustrationSelectedArray = this.illustrationSelectedArray.filter((checkedId) => checkedId != parseInt(id))
    }
  }
  selectAllIllustrations() {
    this.illustrationSelectedArray = this.illustrationListModified.map((illustration) => illustration.id)
    console.log(this.illustrationListModified.map((illustration) => illustration.id.toString()))
    console.log(this.illustrationSelectedArray)
  }
  unselectAllIllustrations() {
    this.illustrationSelectedArray = [];
  }
  isIllustrationChecked(id: Number) {
    return this.illustrationSelectedArray.includes(id);
  }
}

