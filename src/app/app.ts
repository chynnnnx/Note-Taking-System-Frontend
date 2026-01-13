import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { Loading } from './shared/services/loading';
 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule,SharedModule ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('NoteMaster');
  protected readonly loadingService = inject(Loading);
  protected readonly dots = Array(8);

}
