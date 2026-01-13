import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category-model';
import { CreateCategoryDto } from '../models/create-category.dto';
import { UpdateCategoryDto } from '../models/update-category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = '/api/category';
  constructor(private api: ApiService){}

  createCategory(payload: CreateCategoryDto): Observable<CategoryModel>{
    return this.api.post<CategoryModel>(this.baseUrl, payload);
  }
  updateCategory(id: string, payload: UpdateCategoryDto): Observable<CategoryModel>{
    return this.api.put<CategoryModel>(`${this.baseUrl}/${id}`, payload);
  }
  getCategories(): Observable<CategoryModel[]>{
    return this.api.get<CategoryModel[]>(this.baseUrl);
  }
  deleteCategory(id: string): Observable<void>{
    return this.api.delete<void>(`${this.baseUrl}/${id}`);
  }
}
