import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../category';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss']
})
export class CategoriesModalComponent {
  @Input() size? = 'md';
  @Input() title? = 'Modal title';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  categoriesList: Category[] = [];
  categoriesListModified: Category[];

  constructor(
      private categoriesService : CategoriesService,
      private elementRef: ElementRef
    ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categoriesList = categories;
      this.categoriesListModified = categories;
      console.log(this.categoriesListModified);
    }
    )
  }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }

  search(value: any) {
    console.log(value)
    this.categoriesListModified = this.categoriesList.filter((category) => category.name.includes(value));
  }

  addCategory(value: any) {
    console.log("añadir "+ value)

  }
}
