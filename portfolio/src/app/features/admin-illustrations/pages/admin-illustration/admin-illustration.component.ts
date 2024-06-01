import { Component, inject } from '@angular/core';
import { Illustration } from '../../../illustrations/illustration';
import { IllustrationService } from '../../../illustrations/services/illustration.service';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LazyImgDirective } from '../../../../shared/directives/lazy-img.directive';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';


@Component({
    selector: 'app-admin-illustration',
    templateUrl: './admin-illustration.component.html',
    styleUrls: ['./admin-illustration.component.scss'],
    standalone: true,
    imports: [RouterLink, SearchBarComponent, NgIf, MatIconModule, NgFor, MatCheckboxModule, FormsModule, LazyImgDirective, MatButtonModule, MatMenuModule, DialogComponent]
})
export class AdminIllustrationComponent {
  illustrationList: Illustration[] = [];
  illustrationListModified: Illustration[];
  visibilitySort: Boolean = false;
  nameSort: Boolean = false;
  selectedArray: Number[] = [];
  imageUrl = environment.urlApiImage;
  // MODALS
  modalDelete = false;
  modalDeleteList = false;

  selectedItem: number;

  constructor(
    private illustrationService: IllustrationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }
  ngOnInit(): void {
    this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
      this.illustrationList = illustrations;
      this.illustrationListModified = illustrations;
    }
    )
  }
  // SERVICES
  // illustrationService: IllustrationService = inject(IllustrationService);

  // METHODS

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

  setSelectedItem(id: number){
    this.selectedItem = id;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
  getIllustrations() {
    // this.illustrationService.getAllIllustrations()
    //   .then(({ status, data }) => {
    //     if (status == 200) {
    //       this.illustrationList = data;
    //     };
    //   })
    this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
      this.illustrationList = illustrations;
      this.illustrationListModified = illustrations;
    })
  }

  editar(id: Number) {
    this.router.navigate(['/', 'admin','illustration', 'edit-illustration', id])
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
    let illustrationListWithName = this.illustrationList.map((illustration)=> {
      if(!illustration.name){
        illustration.name = '';
      }
      return illustration;
    })
    this.illustrationListModified = illustrationListWithName.filter((illustration) => illustration.name.includes(value));
  }
  delete() {
    this.closeModalDelete()
    this.illustrationService.deleteIllustration(this.selectedItem).subscribe(
      {
        next: (data) => {
          this.getIllustrations();
        },
        error: (errorData) => {
          this.openSnackBar("Ha ocurrido un error")
        },
        complete: () => {
          this.openSnackBar("Ilustración eliminada con éxito")
        }
      }
    )
  }
  deleteList() {
    this.closeModalDeleteList();
    //TODO
    // ARE YOU SURE DIALOG
    this.illustrationService.deleteIllustrationList(this.selectedArray).subscribe(
      {
        next: (data) => {
          this.getIllustrations();
        },
        error: (errorData) => {
          this.openSnackBar("Ha ocurrido un error")
        },
        complete: () => {
          this.openSnackBar("Ilustraciones eliminadas con éxito")
        }
      }
    )
  }

  //SELECTED ILLUSTRATIONS
  onIllustrationPressed($event: any){
    let id: string = $event.source.value;
    if($event.checked){
      this.selectedArray.push(parseInt(id));
    }
    else{
      this.selectedArray = this.selectedArray.filter((checkedId)=> checkedId!=parseInt(id))
    }
  }
  selectAllIllustrations(){
    this.selectedArray = this.illustrationListModified.map((illustration)=>illustration.id)
  }
  unselectAllIllustrations(){
    this.selectedArray = [];
  }
  isIllustrationChecked(id: Number){
    return this.selectedArray.includes(id);
  }
}
