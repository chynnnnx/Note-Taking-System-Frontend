import { Component, inject, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../core/services/user.service.ts';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SharedModule
  ],
  templateUrl: './private-layout.html',
  styleUrls: ['./scss/private-layout.scss']
})
export class PrivateLayout implements OnInit {
  private router = inject(Router);
  private token = inject(TokenService);
  private userService = inject(UserService);

  sidebarVisible: boolean = true;
  isMobile: boolean = false;

  isAuthorized: boolean = false;

  readonly menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
    { label: 'My Notes', icon: 'pi pi-file-edit', routerLink: '/note-list' },
    { label: 'Categories', icon: 'pi pi-folder', routerLink: '/category-list' },
    { label: 'Account', icon: 'pi pi-user', routerLink: '/account' },
  ];

  ngOnInit() {
    
   
    this.isAuthorized = true;  
    this.userService.loadUser().subscribe();
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.token.logout();
    this.router.navigate(['/login']);
  }

  get email(): string {
    return this.userService.email;
  }
}
