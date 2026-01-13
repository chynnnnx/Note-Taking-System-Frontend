import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Observable } from 'rxjs';
import { NoteModel } from '../models/note-model';
import { CreateNoteDto } from '../models/create-note.dto';
import { UpdateNoteDto } from '../models/update-note.dto';
import { PageQueryParams } from '../../../../shared/models/paged-query-params';
import { PagedService } from '../../../../shared/services/paged.service';
import { DEFAULT_PAGINATION } from '../../../../shared/config/pagination.config';
import { PagedResult } from '../../../../shared/models/paged-result';


@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private baseUrl = '/api/note';
  constructor(private api: ApiService, private pagedService: PagedService){}

  createNote(payload: CreateNoteDto): Observable<NoteModel>{
    return this.api.post<NoteModel>(this.baseUrl, payload);
  }
  updateNote(id: string, payload: UpdateNoteDto): Observable<NoteModel>{
    return this.api.put<NoteModel>(`${this.baseUrl}/${id}`, payload);
  }
  togglePin(id:string, isPinned: boolean): Observable<NoteModel>{
    return this.api.patch<NoteModel>(`${this.baseUrl}/${id}/toggle-pin`, {isPinned });
  }
  archiveNote(id:string): Observable<NoteModel>{
    return this.api.patch<NoteModel>(`${this.baseUrl}/${id}/archive`, {});
  }
  unarchiveNote(id:string): Observable<NoteModel>{
    return this.api.patch<NoteModel>(`${this.baseUrl}/${id}/unarchive`,{});
  }
   
  deleteNote(id: string): Observable<void>{
    return this.api.delete<void>(`${this.baseUrl}/${id}`);
  }
  getNotes(params: PageQueryParams = {}): Observable<PagedResult<NoteModel>> {
  const {
    page = DEFAULT_PAGINATION.pageNumber,
    pageSize = DEFAULT_PAGINATION.pageSize,
    archived,
    searchTerm,
    isPinned,
  } = params;

  const query: any = { page, pageSize };

  if (archived !== undefined) query.IsArchived = archived;
  if (isPinned !== undefined) query.IsPinned = isPinned;
  if (searchTerm) query.SearchTerm = searchTerm;

  return this.pagedService.getPaged<NoteModel>(this.baseUrl, query);
}



}
