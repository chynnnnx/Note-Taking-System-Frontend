import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category-model';
import { SharedModule } from '../../../../../shared/shared.module';
import { CategoryDialog } from '../../components/category-dialog/category-dialog';
import { ConfirmService } from '../../../../../shared/services/confirm.service';
import { Toast } from '../../../../../shared/components/toast';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, SharedModule, CategoryDialog],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss']
})
export class CategoryList implements OnInit {

 categories$!: Observable<CategoryModel[]>;

  showDialog = signal(false);
  selectedCategory = signal<CategoryModel | null>(null);

  constructor( private categoryService: CategoryService, private confirmService: ConfirmService,
    private toast: Toast) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getCategories();
    
  }

  openDialog(category?: CategoryModel): void {
    this.selectedCategory.set(category ?? null);
    this.showDialog.set(true);
  }

  closeDialog(): void {
    this.showDialog.set(false);
  }

  saveCategory(data: { name: string }): void {
    const category = this.selectedCategory();

    const action$ = category
      ? this.categoryService.updateCategory(category.id, data)
      : this.categoryService.createCategory(data);

    action$
    .subscribe({
      next: () => {
        this.loadCategories();
        this.toast.success(category ? 'Category updated' : 'Category created');
        this.closeDialog();
      }});
  }

  deleteCategory(id: string): void {
    this.confirmService.delete('Delete this category?', () => {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
        this.toast.success('Category deleted');
      });
    });
  }
}
