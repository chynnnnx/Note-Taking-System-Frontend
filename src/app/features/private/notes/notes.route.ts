import {Routes} from '@angular/router';
import {NoteList} from './pages/note-list/note-list'

export const notesRoutes: Routes = [{
    path: '',
    component: NoteList,
    data: {archived: false}
},
{
    path: 'archived',
    component: NoteList,
    data: {archived: true}
}];