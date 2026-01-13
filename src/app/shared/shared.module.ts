import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Select } from 'primeng/select';   
import { Checkbox } from 'primeng/checkbox';      
import { Textarea } from 'primeng/textarea';
import { DrawerModule } from 'primeng/drawer';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule, 
    ToastModule,
    ProgressSpinnerModule,
    DialogModule,
    ConfirmDialogModule,
    Select,
    Checkbox,
    Textarea,
    DrawerModule,
    SelectButtonModule,
    PaginatorModule,
    CardModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    DialogModule,
    ConfirmDialogModule,
    Select,
    Checkbox,
    Textarea,
    DrawerModule,
    SelectButtonModule,
    PaginatorModule,
    CardModule
  ]
})
export class SharedModule {}