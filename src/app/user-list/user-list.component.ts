import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { AuthService } from '../services/authentification-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Object[]
  user: { name: string, first: string, last: string, phone: string } = { name: '', first: '', last: '', phone: '' }

  constructor(
    private usersService: UserServiceService,
    private myAuthService: AuthService,
    private myRouter: Router,
    private myRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then()

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
        this.myRouter.navigate(["/"]);
      });
      
    this.myRoute.params.subscribe(params => {
      this.getUsersList();
    });
    
  }

  getUsersList(){
    this.usersService.getUsers()
    .then( res => {
      this.users = res;
    })
    .catch()
  }
}
