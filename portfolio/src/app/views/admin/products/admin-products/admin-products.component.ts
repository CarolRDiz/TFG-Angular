import { Component, inject } from '@angular/core';
import { Illustration } from 'src/app/illustration';
import { IllustrationService } from 'src/app/illustration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  illustrationList: Illustration[] = [];

  visibilitySort : Boolean = false;
  nameSort : Boolean = false;
  constructor(
    private illustrationService: IllustrationService, 
    private router: Router
    ) {
    // this.illustrationList = this.illustrationService.getAllIllustrations();
    // this.getIllustrations();
  }
  ngOnInit(): void {
    this.illustrationService.getAllIllustrations().subscribe((illustrations) => {
      this.illustrationList = illustrations;
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
    })
  }

  editar(id: Number) {
    this.router.navigate(['/', 'admin', 'edit-illustration', id])
  }

  sortVisibility(){
    console.log('sort visibility')
    this.visibilitySort = !this.visibilitySort
    // this.illustrationList.sort((a, b) => (a.name > b.name ) ? 1 : -1)
    this.illustrationList.sort((a, b) => (a.visibility == this.visibilitySort ) ? 1 : -1)
  }
  sortName(){
    console.log('sort visibility')
    this.nameSort = !this.nameSort
    if(this.nameSort){
      this.illustrationList.sort((a, b) => (a.name > b.name ) ? 1 : -1)
    }
    else{
      this.illustrationList.sort((a, b) => (a.name < b.name ) ? 1 : -1)
    }
    
  }
}
