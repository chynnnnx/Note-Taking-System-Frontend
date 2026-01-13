import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loading {
  public loading = signal(false);
  show(){this.loading.set(true);}
  hide(){this.loading.set(false);}

}
