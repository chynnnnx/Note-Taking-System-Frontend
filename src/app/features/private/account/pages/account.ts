import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Toast } from '../../../../shared/components/toast';
import { SharedModule } from '../../../../shared/shared.module';
import { UserService } from '../../../../core/services/user.service.ts';
import { AccountService } from '../service/account.service';
import { UserModel } from '../../../../core/models/user/user.model';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './account.html',
  styleUrl: './account.scss'
})
export class Account implements OnInit, OnDestroy {
  user: UserModel | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    private toast: Toast
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: [''],
      middleInitial: [''],
      lastName: [''],
      email: [{ value: '', disabled: true }]
    });

    this.passwordForm = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });

    this.userService.loadUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        if (user) this.profileForm.patchValue(user);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateProfile(): void {
    if (!this.user || this.profileForm.invalid) return;

    this.accountService.updateUser(this.profileForm.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toast.success('Success', 'Profile successfully updated');
      });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;

    this.accountService.changePassword(this.passwordForm.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.passwordForm.reset();
        this.toast.success('Success', 'Password successfully changed');
      });
  }
}
