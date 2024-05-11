import { Component, Input } from '@angular/core';
import { Illustration } from '../../illustration';
import { IllustrationService } from '../../services/illustration.service';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-sort-gallery',
  templateUrl: './sort-gallery.component.html',
  styleUrls: ['./sort-gallery.component.scss']
})
export class SortGalleryComponent {
  @Input() illustrations: Illustration[];

  currentImage = ""
  lightboxOpen = false
  //images = ["../../assets/images/gallery/PANTALLA_Gaelo_JPG_50porciento_RGB.jpg", "../../assets/images/gallery/3.png", "../../assets/images/gallery/2.jpg", "../../assets/images/gallery/4.jpeg", "../../assets/images/gallery/6.jpg", "../../assets/images/gallery/5.jpg", "../../assets/images/gallery/9.jpg", "../../assets/images/gallery/10.jpg", "../../assets/images/gallery/11.jpg", "../../assets/images/gallery/15.jpg", "../../assets/images/gallery/8.jpg", "../../assets/images/gallery/14.webp", "../../assets/images/gallery/1.jpeg"]
  images: string[] = [];
  illustrationList: Illustration[] = [];
  imageColumns: string[][] = [];
  constructor(
    private illustrationService: IllustrationService
  ) { }
  ngOnInit(): void {
    this.illustrationService.getIllustrationsPublic().subscribe(
      {
        next: (data) => {
          this.illustrationList = data;
          this.images = this.illustrationList.map((illustration) => `http://localhost:8080/images/${illustration.image_id}`);
          this.imageColumns = this.getImageColumns();
        }
      }
    )
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  getImageColumns() {
    let countImages = this.images.length;
    let third = Math.floor(countImages / 3);
    var threeColums = []
    var extras = 0;
    if (countImages % 3 != 0) {
      extras = Math.round((countImages / 3) % 1) + 1
    }
    for (let i = 1; i < 4; i++) {
      let newColumn = this.images.slice(i * third - third, i * third)
      threeColums.push(newColumn)
    }
    for (let i = 1; i <= extras; i++) {
      threeColums[i - 1].push(this.images[countImages - i])
    }
    return threeColums;
  }
  selectImage(image: string) {
    this.currentImage = image;
    this.lightboxOpen = true
  }
  slideLeft() {
    let count = this.images.length;
    let index = this.images.indexOf(this.currentImage);
    if (index + 1 == count) {
      index = 0;
    }
    else {
      index++
    }
    this.currentImage = this.images[index]
  }
  slideRight() {
    let count = this.images.length;
    let index = this.images.indexOf(this.currentImage);
    if (index - 1 < 0) {
      index = count - 1;
    }
    else {
      index--
    }
    this.currentImage = this.images[index]
  }
  closeLightbox() {
    this.lightboxOpen = false
  }
}
