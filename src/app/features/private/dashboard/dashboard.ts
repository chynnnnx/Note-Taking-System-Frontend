import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, BehaviorSubject, switchMap } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SharedModule } from '../../../shared/shared.module';
import { NoteService } from '../notes/services/note.service';
import { CategoryService } from '../categories/services/category.service';
import { NoteModel } from '../notes/models/note-model';

interface DashboardStats {
  totalNotes: number;
  totalFavorites: number;
  totalCategories: number;
  totalPinned: number;
}

interface DashboardData {
  stats: DashboardStats;
  recentNotes: NoteModel[];
  pinnedNotes: NoteModel[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  ngOnInit(): void {
this.refresh$.next();  }
  private noteService = inject(NoteService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  quickTitle = '';
  quickContent = '';
  isCapturing = false;

  private refresh$ = new BehaviorSubject<void>(undefined);

  dashboard$: Observable<DashboardData> = this.refresh$.pipe(
    switchMap(() =>
      forkJoin({
        notes:      this.noteService.getNotes({ pageSize: 100 }),
        recent:     this.noteService.getNotes({ pageSize: 5 }),
        pinned:     this.noteService.getNotes({ isPinned: true, pageSize: 4 }),
        favorites:  this.noteService.getNotes({ isFavorite: true, pageSize: 100 }),
        categories: this.categoryService.getCategories(),
      })
    ),
    map(({ notes, recent, pinned, favorites, categories }) => ({
      stats: {
        totalNotes:      notes.total,
        totalFavorites:  favorites.total,
        totalCategories: categories.length,
        totalPinned:     pinned.total,
      },
      recentNotes: recent.data,
      pinnedNotes: pinned.data,
    })),
    shareReplay(1)
  );

  quickCapture(): void {
    if (!this.quickTitle.trim()) return;

    this.isCapturing = true;
    this.noteService
      .createNote({
        title:      this.quickTitle,
        content:    this.quickContent,
        isPinned:   false,
        categoryId: null,
      })
      .subscribe({
        next: () => {
          this.quickTitle   = '';
          this.quickContent = '';
          this.isCapturing  = false;
          this.refresh$.next(); 
        },
        error: () => (this.isCapturing = false),
      });
  }

  goToNote(note: NoteModel): void {
    this.router.navigate(['/notes'], { queryParams: { id: note.id } });
  }

  goToNotes(): void {
    this.router.navigate(['/note-list']);
  }
}