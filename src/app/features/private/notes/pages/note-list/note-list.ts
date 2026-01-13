import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { CategoryService } from '../../../categories/services/category.service';
import { ConfirmService } from '../../../../../shared/services/confirm.service';
import { Toast } from '../../../../../shared/components/toast';
import { NoteDialog } from '../../components/note-dialog/note-dialog';
import { NoteModel } from '../../models/note-model';
import { CategoryModel } from '../../../categories/models/category-model';
import { NoteForm } from '../../models/note-form.model';
import { SharedModule } from '../../../../../shared/shared.module';
import { DEFAULT_PAGINATION } from '../../../../../shared/config/pagination.config'; 

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss',
  standalone: true,
  imports: [CommonModule, AsyncPipe, DatePipe, SharedModule, NoteDialog]
})

export class NoteList implements OnInit {
  private notesSubject = new BehaviorSubject<NoteModel[]>([]);
  notes$: Observable<NoteModel[]> = this.notesSubject.asObservable();
  categories$!: Observable<CategoryModel[]>;

  showDialog = false;
  selectedNote: NoteModel | null = null;
  archivedMode = false;

  viewModes = [
    { label: 'Active', value: false, icon: 'pi pi-list' },
    { label: 'Archived', value: true, icon: 'pi pi-inbox' }
  ];

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    private confirm: ConfirmService,
    private toast: Toast,
    private router: Router,
    private route: ActivatedRoute
  ) {}

 ngOnInit(): void {
  this.categories$ = this.categoryService.getCategories();

  this.route.data.subscribe(data => {
    this.archivedMode = !!data['archived'];
    this.loadNotes();
  });
}

  loadNotes(page = DEFAULT_PAGINATION.pageNumber, pageSize = DEFAULT_PAGINATION.pageSize): void {
  this.noteService.getNotes({ page,pageSize,archived: this.archivedMode })
    .subscribe(pagedResult => this.notesSubject.next(pagedResult.data));
}



  getPinnedCount(notes: NoteModel[]): number {
    return notes.filter(n => n.isPinned).length;
  }

  goToPinnedNotes(): void {
    this.router.navigate(['/notes/pinned']);
  }

  onViewModeChange(event: any): void {
    const route = event.value ? '/note-list/archived' : '/note-list';
    this.router.navigate([route]);
  }

  openDialog(note?: NoteModel): void {
    this.selectedNote = note ?? null;
     this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  saveNote(form: NoteForm): void {
    const action$ = this.selectedNote
      ? this.noteService.updateNote(this.selectedNote.id, form)
      : this.noteService.createNote(form);

    action$.subscribe(note => {
      const notes = this.notesSubject.value;
      const updatedNotes = this.selectedNote
        ? notes.map(n => n.id === note.id ? note : n)
        : [note, ...notes];

      this.notesSubject.next(updatedNotes);
      this.toast.success(this.selectedNote ? 'Note updated' : 'Note created');
      this.showDialog = false;
    });
  }

  deleteNote(id: string): void {
    this.confirm.delete('Delete this note?', () => {
      this.noteService.deleteNote(id).subscribe(() => {
        this.notesSubject.next(this.notesSubject.value.filter(n => n.id !== id));
        this.toast.success('Note deleted');
      });
    });
  }

  togglePin(note: NoteModel): void {
    this.noteService.togglePin(note.id, !note.isPinned).subscribe(updated => {
      const updatedNotes = this.notesSubject.value.map(n =>
        n.id === updated.id ? { ...n, isPinned: updated.isPinned, updatedAt: updated.updatedAt } : n
      );
      this.notesSubject.next(updatedNotes);
    });
  }

  toggleArchive(note: NoteModel): void {
  const action$ = note.isArchived
    ? this.noteService.unarchiveNote(note.id)
    : this.noteService.archiveNote(note.id);

  action$.subscribe(() => {
    this.toast.success(note.isArchived ? 'Note unarchived' : 'Note archived');
    this.loadNotes();  
  });
}
}