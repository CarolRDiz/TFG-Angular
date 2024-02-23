import { Component, inject } from '@angular/core';
import { Illustration } from '../../illustration';
import { IllustrationService } from '../../services/illustration.service';
import { Router } from '@angular/router';

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
  illustrationSelectedArray: Number[] = [];

  constructor(
    private illustrationService: IllustrationService,
    private router: Router
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
  async deleteIllustration(id: any) {
    let success;
    await this.illustrationService.deleteIllustration(id)
      .then(({ status }) => {
        console.log(status);
        success = true;
      }
      );
    if (success) {
      this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
        this.illustrationList = illustrations;
        this.illustrationListModified = illustrations;
      }
      )
    }
  }
  async deleteIllustrationList() {
    //TODO
    // ARE YOU SURE
    let success;
    await this.illustrationService.deleteIllustrationList(this.illustrationSelectedArray)
      .then(({ status }) => {
        console.log(status);
        success = true;
      }
      );
    if (success) {
      this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
        this.illustrationList = illustrations;
        this.illustrationListModified = illustrations;
        this.illustrationSelectedArray = [];
      }
      )
    }
  }

  //SELECTED ILLUSTRATIONS
  onIllustrationPressed($event: any){
    let id: string = $event.source.value;
    if($event.checked){
      this.illustrationSelectedArray.push(parseInt(id));
    }
    else{
      this.illustrationSelectedArray = this.illustrationSelectedArray.filter((checkedId)=> checkedId!=parseInt(id))
    }
  }
  selectAllIllustrations(){
    this.illustrationSelectedArray = this.illustrationListModified.map((illustration)=>illustration.id)
    console.log(this.illustrationListModified.map((illustration)=>illustration.id.toString()))
    console.log(this.illustrationSelectedArray)
  }
  unselectAllIllustrations(){
    this.illustrationSelectedArray = [];
  }
  isIllustrationChecked(id: Number){
    console.log(this.illustrationSelectedArray.includes(id))
    return this.illustrationSelectedArray.includes(id);
  }
}
