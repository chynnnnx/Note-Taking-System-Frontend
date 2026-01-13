import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NoteForm } from '../../models/note-form.model';
import { NoteDialog } from '../../components/note-dialog/note-dialog';
import { ConfirmService } from '../../../../../shared/services/confirm.service';
import { Toast } from '../../../../../shared/components/toast';
import { NoteModel } from '../../models/note-model';
import { CategoryModel } from '../../../categories/models/category-model';
import { CategoryService } from '../../../categories/services/category.service';
import { Observable, BehaviorSubject, switchMap, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pinned-notes',
  imports: [SharedModule, CommonModule, NoteDialog],
  templateUrl: './pinned-notes.html',
  styleUrl: './pinned-notes.scss',
})
export class PinnedNotes implements OnInit {
  notes$!: Observable<NoteModel[]>;
  categories$!: Observable<CategoryModel[]>;

  showDialog = false;
  selectedNote: NoteModel | null = null;

  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    private confirm: ConfirmService,
    private toast: Toast,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.notes$ = this.refreshTrigger$.pipe(
    switchMap(() =>
      this.noteService.getNotes({ isPinned: true })
    ),
    map(result => result.data)
  );

  this.categories$ = this.categoryService.getCategories();
}


  private loadData(): void {
    this.refreshTrigger$.next();
  }

  goBack(): void {
    this.router.navigate(['/note-list']);
  }

  editNote(note: NoteModel): void {
    this.selectedNote = note;
    this.showDialog = true;
  }

  saveNote(form: NoteForm): void {
    if (!this.selectedNote) return;

    this.noteService.updateNote(this.selectedNote.id, form).subscribe(() => {
      this.toast.success('Note updated');
      this.showDialog = false;
      this.loadData();
    });
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  deleteNote(id: string): void {
    this.confirm.delete('Delete this note?', () => {
      this.noteService.deleteNote(id).subscribe(() => {
        this.toast.success('Note deleted');
        this.loadData();
      });
    });
  }

 togglePin(note: NoteModel): void {
  this.noteService
    .togglePin(note.id, !note.isPinned)
    .subscribe(() => {
      if (note.isPinned) {
        this.toast.info('Note unpinned');
      }
      this.loadData();
    });
}


}