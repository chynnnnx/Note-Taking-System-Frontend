import { Component, signal } from '@angular/core';
import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule, AsyncPipe, DatePipe, SharedModule, NoteDialog],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList {

  notes$!: Observable<NoteModel[]>;
  categories$!: Observable<CategoryModel[]>;

  showDialog = signal(false);
  selectedNote = signal<NoteModel | null>(null);
  archivedMode = signal(false);

  viewModes = [
    { label: 'Active', value: false, icon: 'pi pi-list' },
    { label: 'Archived', value: true, icon: 'pi pi-inbox' }
  ];

  constructor(private noteService: NoteService, private categoryService: CategoryService, private confirm: ConfirmService,
    private toast: Toast, private router: Router, private route: ActivatedRoute) { this.initDataStreams();}

  private initDataStreams() {
    this.categories$ = this.categoryService.getCategories();

    this.notes$ = this.route.data.pipe(
      map(data => !!data['archived']),
      tap(archived => this.archivedMode.set(archived)),
      switchMap(archived => this.fetchNotes(archived))
    );
  }

  private fetchNotes(archived: boolean): Observable<NoteModel[]> {
    return this.noteService.getNotes({
      page: DEFAULT_PAGINATION.pageNumber,
      pageSize: DEFAULT_PAGINATION.pageSize,
      archived
    }).pipe(map(r => r.data));
  }

  openDialog(note?: NoteModel) {
    this.selectedNote.set(note || null);
    this.showDialog.set(true);
  }

  closeDialog() {
    this.showDialog.set(false);
  }

  saveNote(form: NoteForm) {
    const note = this.selectedNote();
    const action$ = note
      ? this.noteService.updateNote(note.id, form)
      : this.noteService.createNote(form);

    action$.pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.reloadNotes();
      this.toast.success(note ? 'Note updated' : 'Note created');
      this.closeDialog();
    });
  }

  deleteNote(id: string) {
    this.confirm.delete('Delete this note?', () => {
      this.noteService.deleteNote(id).pipe(takeUntilDestroyed()).subscribe(() => {
        this.reloadNotes();
        this.toast.success('Note deleted');
      });
    });
  }

  toggleNoteAction(
    note: NoteModel,
    action: 'pin' | 'archive'
  ) {
    let action$;

    if (action === 'pin') {
      action$ = this.noteService.togglePin(note.id, !note.isPinned);
    } else {
      action$ = note.isArchived
        ? this.noteService.unarchiveNote(note.id)
        : this.noteService.archiveNote(note.id);
    }

    action$.pipe(takeUntilDestroyed())
    .subscribe(() => {
      const message =
        action === 'pin'
          ? note.isPinned ? 'Note unpinned' : 'Note pinned'
          : note.isArchived ? 'Note unarchived' : 'Note archived';

      this.toast.success(message);
      this.reloadNotes();
    });
  }

 goToPinnedNotes(): void {
  this.router.navigate(['note-list/pinned'], { relativeTo: this.route.root });
}


 onViewModeChange(value: boolean) {
  this.router.navigate(
    [value ? 'note-list/archived' : 'note-list'], 
    { relativeTo: this.route.root }
  );
}

  getPinnedCount(notes: NoteModel[]): number {
    return notes.filter(n => n.isPinned).length;
  }

  private reloadNotes() {
    this.notes$ = this.fetchNotes(this.archivedMode());
  }
}