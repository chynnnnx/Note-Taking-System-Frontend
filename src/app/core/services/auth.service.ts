import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { LoginModel } from '../models/auth/login-model';
import { RegisterModel } from '../models/auth/register-model';
import { AuthResponse } from '../models/auth/auth-response';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base = '/api/auth' ;

  constructor(private api: ApiService) {}

  register(data: RegisterModel): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(`${this.base}/register`, data);
  }

  login(data: LoginModel): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(`${this.base}/login`, data);
  }

  refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(`${this.base}/refresh-token`, { token: refreshToken });
  }
}