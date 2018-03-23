import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../services/authentification-service.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class SignupComponent implements OnInit {

  constructor(private myAuth: AuthService, private myRouter: Router) {}

  errorMessage:String;
  signUpInfo={
    email:"",
    password:"",
    phone: ""
  }
  ngOnInit() {}

  doSignUp() {
    this.myAuth
      .signup(this.signUpInfo)
      .then(resultFromApi => {
        // clear form
        this.signUpInfo = { email: "", password: "" , phone: ""};

        // clear error message
        this.errorMessage = "";

        // redirect to /phones
        this.myRouter.navigate(["/dashboard"]);
      })
      .catch(err => {
        const parsedError = err.json();
        this.errorMessage = parsedError.message + " 😤";
      });
  } //close doSignUp()
}