import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category-model';
import { CreateCategoryModel } from '../models/create-category.model';
import { UpdateCategoryModel } from '../models/update-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = '/api/category';
  constructor(private api: ApiService){}

  createCategory(payload: CreateCategoryModel): Observable<CategoryModel>{
    return this.api.post<CategoryModel>(this.baseUrl, payload);
  }
  updateCategory(id: string, payload: UpdateCategoryModel): Observable<CategoryModel>{
    return this.api.put<CategoryModel>(`${this.baseUrl}/${id}`, payload);
  }
  getCategories(): Observable<CategoryModel[]>{
    return this.api.get<CategoryModel[]>(this.baseUrl);
  }
  deleteCategory(id: string): Observable<void>{
    return this.api.delete<void>(`${this.baseUrl}/${id}`);
  }
}
