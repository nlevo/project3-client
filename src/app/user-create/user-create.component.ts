import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/authentification-service.service';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  
  //object for new user
  user = {
      phone: "",
      department: "",
      position: "",
      access: "",
      email: "",
      encryptedPassword: "",
      status: "",
      name: {first: "", last: ""}
  }

  saveError: String

  myCoolUploader = new FileUploader({
    url: environment.apiBase + "/api/phones",
    itemAlias: "phoneImage"
  });

  constructor(
    private myUserService: UserServiceService,
    private myRouter: Router
  ) { }

  ngOnInit() {
    
  }

  saveNewUser() {
    // if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.saveUserNoImage();
    // } else {
    //   this.saveUserWithImage();
    // }
  }

  private saveUserWithImage(){
    this.myCoolUploader.onBuildItemForm = (item, form) => {
      // form.append('phoneBrand', this.newUser.userEmail);
      // form.append("phoneName", this.newUser.userPhone);
    }
    this.myCoolUploader.onSuccessItem = (item, response) =>{
      // this.newUser = {
      //     // userEmail: "",
      //     // userPhone: "",
      //   };
        this.saveError = ""
        this.myRouter.navigate(["/users"]);
    }
    this.myCoolUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving phone with image went bad. Sorry!";
    }
    this.myCoolUploader.uploadAll();
  }

  private saveUserNoImage(){
    this.myUserService.createNewUser(this.user)
    .then( res => {
      this.user = {
        phone: "",
        department: "",
        position: "",
        access: "",
        email: "",
        encryptedPassword: "",
        status: "",
        name: {first: "", last: ""}
      }
      this.saveError = "";
      this.myRouter.navigate(['/users'])
    })
    .catch( err => { this.saveError = "Something went wrong with saving"})
  }
}
