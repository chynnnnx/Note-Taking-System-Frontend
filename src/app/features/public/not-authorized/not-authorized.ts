import { Component } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [],
  templateUrl: './not-authorized.html',
  styleUrl: './not-authorized.scss',
})
export class NotAuthorized {
constructor(private router: Router){

}

goToLogin(){
  this.router.navigate(['/login']);
}
}
