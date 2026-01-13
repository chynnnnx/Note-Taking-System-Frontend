import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { NoteModel } from '../../models/note-model';
import { NoteForm } from '../../models/note-form.model';
import { CategoryModel } from '../../../categories/models/category-model';
 
@Component({
  selector: 'app-note-dialog',
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './note-dialog.html',
  styleUrl: './note-dialog.scss',
})
export class NoteDialog implements OnChanges {
  @Input() visible = false;
  @Input() note: NoteModel | null = null;
  @Input() categories: CategoryModel[] = [];

  @Output() save = new EventEmitter<NoteForm>();
  @Output() close = new EventEmitter<void>();

  form: NoteForm = this.emptyForm();
ngOnChanges(changes: SimpleChanges): void {
  if ((changes['visible'] && this.visible) || changes['note']) {
    this.resetForm();
  }
}




  private resetForm(): void {
    this.form = this.note
      ? {
          title: this.note.title,
          content: this.note.content,
          categoryId: this.note.categoryId ?? null,
          isPinned: this.note.isPinned
        }
      : this.emptyForm();
  }

  private emptyForm(): NoteForm {
    return {
      title: '',
      content: '',
      categoryId: null,
      isPinned: false
    };
  }

  onSave(): void {
    if (!this.form.title.trim()) return;
    this.save.emit(this.form);
  }
}