import { Component, inject } from '@angular/core';
import { Illustration } from 'src/app/illustration';
import { IllustrationService } from 'src/app/illustration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-illustration',
  templateUrl: './admin-illustration.component.html',
  styleUrls: ['./admin-illustration.component.scss']
})
export class AdminIllustrationComponent {
  illustrationList: Illustration[] = [];
  illustrationListModified: Illustration[];
  visibilitySort : Boolean = false;
  nameSort : Boolean = false;
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

  sortVisibility(){
    console.log('sort visibility')
    this.visibilitySort = !this.visibilitySort
    // this.illustrationList.sort((a, b) => (a.name > b.name ) ? 1 : -1)
    this.illustrationListModified.sort((a, b) => (a.visibility == this.visibilitySort ) ? 1 : -1)
  }
  sortName(){
    console.log('sort visibility')
    this.nameSort = !this.nameSort
    if(this.nameSort){
      this.illustrationListModified.sort((a, b) => (a.name > b.name ) ? 1 : -1)
    }
    else{
      this.illustrationListModified.sort((a, b) => (a.name < b.name ) ? 1 : -1)
    }
  }
  search(value:any){
    console.log(value)
    this.illustrationListModified = this.illustrationList.filter((illustration)=>illustration.name.includes(value));
  }
}
