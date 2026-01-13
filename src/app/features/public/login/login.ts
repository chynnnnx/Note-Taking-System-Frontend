  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from '../../../core/services/auth.service';
  import { TokenService } from '../../../core/services/token.service';
  import { LoginModel } from '../../../core/models/auth/login-model';
  import { SharedModule } from '../../../shared/shared.module';
 
  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
  })
  export class Login implements OnInit {
    loginForm!: FormGroup;

    constructor(
      private fb: FormBuilder,private authService: AuthService,private tokenService: TokenService,
      private router: Router 
    ) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    onLogin() {
    if (!this.loginForm.valid) return;
    const data: LoginModel = this.loginForm.value;

     this.authService.login(data)
       .subscribe(res => {
        this.tokenService.saveTokens(res);
        this.router.navigate(['/dashboard']);
    });
}

  }
