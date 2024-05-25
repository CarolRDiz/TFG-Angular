
import { Component, inject } from '@angular/core';
import { Illustration } from 'src/app/illustrations/illustration';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { environment } from 'src/app/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LazyImgDirective } from '../../../shared/directives/lazy-img.directive';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.scss'],
    standalone: true,
    imports: [RouterLink, SearchBarComponent, NgIf, MatIconModule, NgFor, MatCheckboxModule, FormsModule, LazyImgDirective, MatButtonModule, MatMenuModule, DialogComponent]
})
export class AdminProductsComponent {
  productsList: Product[] = [];
  itemsListModified: Product[];
  visibilitySort: Boolean = false;
  nameSort: Boolean = false;
  selectedArray: number[] = [];
  imageUrl = environment.urlApiImage;
  modalDelete = false;
  modalDeleteList = false;
  selectedItem: number;

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getProducts();
    // this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
    //   this.illustrationList = illustrations;
    //   this.itemsListModified = illustrations;
    // }
    // )
  }
  // SERVICES
  // illustrationService: IllustrationService = inject(IllustrationService);

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
  // METHODS
  setSelectedItem(id: number){
    this.selectedItem = id;
  }
  getProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.productsList = data;
      this.itemsListModified = data;
    })
    // this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
    //   this.illustrationList = illustrations;
    //   this.itemsListModified = illustrations;
    // })
  }

  editar(id: Number) {
    this.router.navigate(['/', 'admin', 'edit-product', id])
  }

  sortVisibility() {
    this.visibilitySort = !this.visibilitySort
    // this.illustrationList.sort((a, b) => (a.name > b.name ) ? 1 : -1)
    this.itemsListModified.sort((a, b) => (a.visibility == this.visibilitySort) ? 1 : -1)
  }
  sortName() {
    this.nameSort = !this.nameSort
    if (this.nameSort) {
      this.itemsListModified.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    else {
      this.itemsListModified.sort((a, b) => (a.name < b.name) ? 1 : -1)
    }
  }
  search(value: any) {
    let itemListWithName = this.productsList.map((item) => {
      if (!item.name) {
        item.name = '';
      }
      return item;
    })
    this.itemsListModified = itemListWithName.filter((item) => item.name.includes(value));
  }
  delete() {
    this.closeModalDelete()
    this.productService.delete(this.selectedItem).subscribe({
      next: (data) => {
      },
      error: (errorData) => {
        this.openSnackBar("Ha ocurrido un error")
      },
      complete: () => {
        this.getProducts();
        this.openSnackBar("Producto eliminado con éxito")
      }
    })
  }
  openModalDelete(){
    this.modalDelete  = true;
  }
  closeModalDelete(){
    this.modalDelete  = false;
  }
  openModalDeleteList(){
    this.modalDeleteList  = true;
  }
  closeModalDeleteList(){
    this.modalDeleteList  = false;
  }

  deleteList() {
    this.closeModalDeleteList()
    // //TODO
    // // ARE YOU SURE
    this.productService.deleteList(this.selectedArray).subscribe({
      next: (data) => {
      },
      error: (errorData) => {
        this.openSnackBar("Ha ocurrido un error")
      },
      complete: () => {
        this.getProducts();
        this.unselectAllItems();
        this.openSnackBar("Productos eliminados con éxito")
      }
    })
  }

  //TODO
  //SELECTED ILLUSTRATIONS
  onItemPressed($event: any) {
    let id: string = $event.source.value;
    if ($event.checked) {
      this.selectedArray.push(parseInt(id));
    }
    else {
      this.selectedArray = this.selectedArray.filter((checkedId) => checkedId != parseInt(id))
    }
  }
  selectAllItems() {
    this.selectedArray = this.itemsListModified.map((illustration) => illustration.id)
    console.log(this.itemsListModified.map((illustration) => illustration.id.toString()))
    console.log(this.selectedArray)
  }
  unselectAllItems() {
    this.selectedArray = [];
  }
  isItemChecked(id: number) {
    return this.selectedArray.includes(id);
  }
}

