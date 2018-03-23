import { AuthService } from './../services/authentification-service.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class DashboardComponent implements OnInit {

  public isLoggedIn;

  constructor(private _authService: AuthService, private _router: Router, private _route: ActivatedRoute ) {  }

  ngOnInit() {
    this._authService
    .checklogin()
    // If success, we are logged in.
    .then(resultFromApi => {
      this.isLoggedIn = true;
      //this._router.navigate(["/properties"]);
    })

    // Even if you don't do anything on error, catch to avoid a console error.
    .catch(err => {
      this._router.navigate(["/login"]);
      console.log(err);
    });
  }

  logOut(){
    this._authService.logout()
    .then(()=>{
      this._router.navigate(['/login'])
      console.log("AFTER NAVIGATE TRIGGERED");
      
    })
    .catch()
  }

}
