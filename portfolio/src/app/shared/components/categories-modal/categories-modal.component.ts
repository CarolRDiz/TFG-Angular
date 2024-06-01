import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CategoriesService } from 'src/app/features/products/categories.service';
import { CategoryCreate } from 'src/app/features/products/category-create';
import { Category } from 'src/app/features/products/category';

@Component({
    selector: 'app-categories-modal',
    templateUrl: './categories-modal.component.html',
    styleUrls: ['./categories-modal.component.scss'],
    standalone: true,
    imports: [MatIconModule, SearchBarComponent, NgFor, MatButtonModule, MatMenuModule, MatCheckboxModule, FormsModule]
})
export class CategoriesModalComponent {

  @Output() closeEvent = new EventEmitter();
  //@Output() submitEvent = new EventEmitter();

  categoriesList: Category[] = [];
  categoriesListModified: Category[];

  @Input() selectedCategories: Number[] = [];
  selectedCategoriesModified: Number[] = [];
  @Output() selectEvent = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document,
    protected renderer: Renderer2,
    private categoriesService: CategoriesService,
    private elementRef: ElementRef
  ) {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  ngOnDestroy() {
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.selectedCategoriesModified = this.selectedCategories;
  }
  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categoriesList = categories;
      this.categoriesListModified = categories;
    }
    )
  }
  delete(id: number){
    this.categoriesService.delete(id).subscribe(
      {
        error: (errorData) => {

        },
        complete: () => {
          this.getAllCategories();
        }
      }
    );
  }
  close(): void {
    this.closeEvent.emit();
  }

  // submit(): void {
  //   this.elementRef.nativeElement.remove();
  //   this.submitEvent.emit();
  // }

  search(value: any) {
    console.log(value)
    this.categoriesListModified = this.categoriesList.filter((category) => category.name.toLowerCase().includes(value.toLowerCase()));
  }
  //SELECTED CATEGORIES
  onCategoryPressed($event: any) {
    let id: string = $event.source.value;
    if ($event.checked) {
      this.selectedCategoriesModified.push(parseInt(id));
    }
    else {
      this.selectedCategoriesModified = this.selectedCategoriesModified.filter((checkedId) => checkedId != parseInt(id))
    }
    this.selectEvent.emit(this.selectedCategoriesModified);
  }
  isCategoryChecked(id: Number) {
    return this.selectedCategoriesModified.includes(id);
  }
  addCategory(value: any) {
    let categoriesNames = this.categoriesList.map(category => category.name);
    if (categoriesNames.includes(value)) {
      console.log("La categoría ya existe")
    } else if (value == '') {
      console.log("El nombre es requerido")
    }
    else {
      let newCategory: CategoryCreate = {
        name: value
      }
      this.categoriesService.postCategory(newCategory).subscribe((data) => {
        this.getAllCategories();
      });

    }
    console.log("añadir " + value)
  }
}
