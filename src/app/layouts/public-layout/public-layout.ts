import { Component, computed, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {
  protected readonly title = signal('NoteMaster');
  protected readonly currentYear = new Date().getFullYear();
  protected readonly primaryLinks = [
    { label: 'About', href: '/about' },
    { label: 'Login', href: '/login' },
    { label: 'Sign Up', href: '/signup' },
  ];
  protected readonly footerLinks = [
    { label: 'About', href: '/about' },
    { label: 'Sign In', href: '/login' },
    { label: 'Create Account', href: '/signup' },
  ];

  protected readonly footerTagline = computed(
    () => `${this.title()} keeps notes, categories, and account tools in one focused workspace.`,
  );
}
