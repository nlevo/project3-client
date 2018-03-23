import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { AuthService } from '../services/authentification-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  
})
export class UserProfileComponent implements OnInit {
  user = <any>{};

  public isDataAvailable:boolean = false;
    
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
      this.getUserDetails(params["id"]);
    });
  }

  getUserDetails(parameter){
    this.usersService.getUser(parameter)
    .then( res => {
      this.user = res;
      this.isDataAvailable = true;
    })
    .catch()
  }

  deleteThisPhone(id){
    if (!confirm("Are you sure?")) {
      return;
    }
    this.usersService.deleteUser(this.user._id)
      .then( res => {
        this.myRouter.navigate(['/users'])
      })
      .catch( err => {
        console.log("Error in deleting:", err)
      })
  }

  doTheUpdate(id) {
    console.log("User:", this.user);
    this.sendUpdatesToApi(id);
  }

  sendUpdatesToApi(id){
    this.usersService.updateUser(id, this.user)
      .toPromise()
      .then(()=>{
        this.myRouter.navigate(['/users'])
      })
      .catch()
  }
}