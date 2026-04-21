import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../../../shared/shared.module';
import { NoteModel } from '../../models/note-model';
import { NoteService } from '../../services/note.service';
import { PagedResult } from '../../../../../shared/models/paged-result';
import { PageQueryParams } from '../../../../../shared/models/paged-query-params';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit {
  pagedResult$!: Observable<PagedResult<NoteModel>>;
  currentPage = signal(0);
  pageSize = signal(12);

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const params = this.buildQueryParams();
    this.pagedResult$ = this.noteService.getNotes(params);
  }

  onPageChange(event: PaginatorState): void {
    if (event.page !== undefined && event.rows !== undefined) {
      this.currentPage.set(event.page);
      this.pageSize.set(event.rows);
      this.loadFavorites();
    }
  }

  toggleFavorite(note: NoteModel): void {
    this.noteService.favorite(note.id, !note.isFavorite).subscribe({
      next: () => this.loadFavorites()
    });
  }

  togglePin(note: NoteModel): void {
    this.noteService.togglePin(note.id, !note.isPinned).subscribe({
      next: () => this.loadFavorites()
    });
  }

  archiveNote(note: NoteModel): void {
    this.noteService.archiveNote(note.id).subscribe({
      next: () => this.loadFavorites()
    });
  }

  getStartRecord(result: PagedResult<NoteModel>): number {
    return result.data.length === 0 ? 0 : this.currentPage() * this.pageSize() + 1;
  }

  getEndRecord(result: PagedResult<NoteModel>): number {
    return Math.min((this.currentPage() + 1) * this.pageSize(), result.total);
  }

  private buildQueryParams(): PageQueryParams {
    return {
      page: this.currentPage() + 1,
      pageSize: this.pageSize(),
      isFavorite: true,
      archived: false
    };
  }
}