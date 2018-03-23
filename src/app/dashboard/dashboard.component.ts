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

  constructor(private _authService: AuthService, private _router: Router, private _route: ActivatedRoute ) {  }

  ngOnInit() {
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
