import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CategoryModel } from '../../models/category-model';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './category-dialog.html',
  styleUrls: ['./category-dialog.scss']
})
export class CategoryDialog {
  @Input() visible = false;
  @Input() category: CategoryModel | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ name: string }>();

  categoryName = '';

  ngOnChanges(): void {
    this.categoryName = this.category?.name ?? '';
  }

  onSave(): void {
    if (!this.categoryName.trim()) return;
    this.save.emit({ name: this.categoryName });
  }
}
