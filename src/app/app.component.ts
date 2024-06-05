import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weblogin';

  constructor(
    private router: Router
  ){}

  login() {
    this.router.navigate(['login'])
  }

  signup() {
    this.router.navigate(['signup'])
  }
}
