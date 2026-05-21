import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly featureCards = [
    {
      icon: 'pi pi-bookmark',
      title: 'Organized notes',
      description: 'Capture ideas quickly, sort them into categories, and keep priority work easy to find.',
    },
    {
      icon: 'pi pi-star',
      title: 'Focused highlights',
      description: 'Pin and favorite the notes that matter so they stay visible during busy workdays.',
    },
    {
      icon: 'pi pi-user-edit',
      title: 'Simple account tools',
      description: 'Manage access, update your profile, and keep your workspace personal and secure.',
    },
  ];
}
