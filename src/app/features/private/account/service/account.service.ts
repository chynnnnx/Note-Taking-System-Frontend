import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../core/models/user/user.model';
import { ChangePasswordDto } from '../../../../core/models/user/change-password.model';
import { UpdateUserModel } from '../../../../core/models/user/update-user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = '/api/user';
  constructor(private api: ApiService){}

  getUserInfo():Observable<UserModel>{
    return this.api.get<UserModel>(`${this.baseUrl}`);
  }
  updateUser(dto: UpdateUserModel): Observable<UserModel> {
  return this.api.put<UserModel>(this.baseUrl, dto);
}
  changePassword(dto: ChangePasswordDto) {
  return this.api.patch(`${this.baseUrl}/change-password`, dto);
}
}
