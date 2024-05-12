import { Component, inject } from '@angular/core';
import { Illustration } from '../../illustration';
import { IllustrationService } from '../../services/illustration.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-illustration',
  templateUrl: './admin-illustration.component.html',
  styleUrls: ['./admin-illustration.component.scss']
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
    this.router.navigate(['/', 'admin', 'edit-illustration', id])
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
  delete(id: any) {
    this.closeModalDelete()
    this.illustrationService.deleteIllustration(id).subscribe(
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
    console.log(this.illustrationListModified.map((illustration)=>illustration.id.toString()))
    console.log(this.selectedArray)
  }
  unselectAllIllustrations(){
    this.selectedArray = [];
  }
  isIllustrationChecked(id: Number){
    return this.selectedArray.includes(id);
  }
}
