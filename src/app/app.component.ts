import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./services/authentification-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  router;
  constructor(public _router: Router, private myAuthService: AuthService ) {
    this.router = _router;
  }

  ngOnInit() {
  }

  logOut(){
    this.myAuthService.logout();
  }
}
