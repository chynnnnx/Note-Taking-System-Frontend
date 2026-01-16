import { Routes } from '@angular/router';
import { PrivateLayout } from '../../layouts/private-layout/private-layout';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from '../../core/guards/auth-guard';
import { NoteList } from './notes/pages/note-list/note-list';
import { CategoryList } from './categories/pages/category-list/category-list';
import { PinnedNotes } from './notes/pages/pinned-notes/pinned-notes';
import { Account } from './account/pages/account';

export const privateRoutes: Routes = [
  {
    path: '',
    component: PrivateLayout,
    canActivate:[authGuard],
    children: [
      { path: 'dashboard', component: Dashboard }, 
      { path: 'note-list', component: NoteList, data: { archived: false } },
      { path: 'note-list/archived', component: NoteList, data: { archived: true } },
      { path: 'category-list', component: CategoryList },
      { path: 'note-list/pinned', component: PinnedNotes },
      {path: 'account', component: Account}
    ]
  }
];
