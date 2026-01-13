import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

   saveTokens(auth: AuthResponse) {
    if (!auth) return;
    if (auth.token) sessionStorage.setItem('token', auth.token);
    if (auth.refreshToken) localStorage.setItem('refreshToken', auth.refreshToken);
    if (auth.role) localStorage.setItem('role', auth.role.toLowerCase());
  }
   setToken(token: string) {
    if (token) sessionStorage.setItem('token', token);
  }
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
   setRefreshToken(token: string) {
    if (token) localStorage.setItem('refreshToken', token);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  }
}
