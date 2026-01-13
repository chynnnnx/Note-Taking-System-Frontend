import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api'; 
@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private confirmationService: ConfirmationService){}

  delete(message: string, onConfirm: () => void): void {
  this.confirmationService.confirm({
    header: 'Confirm Delete',
    message,
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    acceptButtonStyleClass: 'p-button-danger p-button-sm',
    rejectButtonStyleClass: 'p-button-outlined p-button-secondary p-button-sm',
    accept: onConfirm
  });
}
}
