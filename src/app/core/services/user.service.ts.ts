import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { UserModel } from '../models/user/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private _user = signal<UserModel | null>(null);

   private baseUrl = '/api/user';
  constructor(private api: ApiService) {}
 loadUser() {
    return this.api.get<UserModel>(`${this.baseUrl}`).pipe(
      tap(user => this._user.set(user))  
    );
  }
  

  get user(): UserModel | null {
    return this._user();
  }

  get email(): string {
    return this._user()?.email ?? 'user@example.com';
  }
}
