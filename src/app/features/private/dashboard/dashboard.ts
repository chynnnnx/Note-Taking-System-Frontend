import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';
import {Router} from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
constructor(  private router: Router){}
  private confirmationService = inject(ConfirmationService);

 testConfirm() {
    this.confirmationService.confirm({
      message: 'Test delete?',
      accept: () => console.log('Confirmed')
    });
  }
}


