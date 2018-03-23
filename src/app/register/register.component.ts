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
  ngOnInit() {
    this.myAuth
    .checklogin()
    // If success, we are logged in.
    .then(resultFromApi => {
      this.myRouter.navigate(["/properties"]);
    })

    // Even if you don't do anything on error, catch to avoid a console error.
    .catch(err => {
      console.log(err);
    });

  }

  doSignUp() {
    this.myAuth
      .signup(this.signUpInfo)
      .then(resultFromApi => {
        // clear form
        this.signUpInfo = { email: "", password: "" , phone: ""};

        // clear error message
        this.errorMessage = "";

        // redirect to /phones
        this.myRouter.navigate(["/properties"]);
      })
      .catch(err => {
        const parsedError = err.json();
        this.errorMessage = parsedError.message + " 😤";
      });
  } //close doSignUp()
}