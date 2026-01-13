import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category-model';
import { SharedModule } from '../../../../../shared/shared.module';
import { CategoryDialogComponent } from '../../components/category-dialog/category-dialog';
import { ConfirmService } from '../../../../../shared/services/confirm.service';
import { Toast } from '../../../../../shared/components/toast';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, SharedModule, CategoryDialogComponent],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss']
})
export class CategoryList implements OnInit {

  private categoriesSubject = new BehaviorSubject<CategoryModel[]>([]);
  categories$: Observable<CategoryModel[]>= this.categoriesSubject.asObservable();

  constructor( private categoryService: CategoryService, private confirmService: ConfirmService, private toast: Toast) {}
  
   showDialog = false;
  selectedCategory: CategoryModel | null = null;

    ngOnInit(): void {
      this.loadCategories();
    }

    loadCategories(): void {
      this.categoryService.getCategories()
        .subscribe(categories =>{this.categoriesSubject.next(categories);});
    }

    openDialog(category?: CategoryModel): void {
      this.selectedCategory = category ??null;
      this.showDialog = false;
      this.showDialog = true;
    }

   
    saveCategory(data: { name: string }): void {
    const action$ = this.selectedCategory
      ? this.categoryService.updateCategory(this.selectedCategory.id, data)
      : this.categoryService.createCategory(data);

    action$.subscribe(category => {
      const categories = this.categoriesSubject.value;
      const updatedCategories = this.selectedCategory
        ? categories.map(c => c.id === category.id ? category : c)
        : [category, ...categories];

      this.categoriesSubject.next(updatedCategories);
      this.toast.success(this.selectedCategory ? 'Category updated' : 'Category created');
      this.showDialog = false;
    });
  }

    closeDialog() {
      this.showDialog = false;
    }


    deleteCategory(id: string): void {
    this.confirmService.delete('Delete this category?', () => {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.categoriesSubject.next(this.categoriesSubject.value.filter(c => c.id !== id));
        this.toast.success('Category deleted');
      });
    });
  }
}
