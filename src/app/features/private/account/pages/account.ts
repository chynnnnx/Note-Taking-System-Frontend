import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { UserService } from '../../../../core/services/user.service.ts';
import { AccountService } from '../service/account.service';

import { UserModel } from '../../../../core/models/user/user.model';
import { UpdateUserModel } from '../../../../core/models/user/update-user.model';
import { ChangePasswordDto } from '../../../../core/models/user/change-password.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account implements OnInit {

  user: UserModel | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      middleInitial: [''],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }]
    });

    this.passwordForm = this.fb.nonNullable.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.userService.loadUser().subscribe(user => {
      this.user = user;
      if (user) {
        this.profileForm.patchValue(user);
      }
    });
  }

  updateProfile(): void {
    if (!this.user || this.profileForm.invalid) return;

    const model: UpdateUserModel = this.profileForm.getRawValue();
    this.accountService.updateUser( model).subscribe();
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;

    const dto: ChangePasswordDto = this.passwordForm.getRawValue();
    this.accountService.changePassword(dto).subscribe();
  }
}
