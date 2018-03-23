import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthService {
  constructor(private myHttp: Http) {}

  signup(componentInfo) {
    return (
      this.myHttp
        .post(
          `${environment.apiBase}/api/signup`,

          // Form body information to send to the back end (req.body)
          {
            signUpEmail: componentInfo.email,
            signUpPassword: componentInfo.password,
            signUpPhone: componentInfo.phone
          },

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json())
    );
  } // close signup()
  login(componentInfo) {
    console.log("THE OBJECT IS :", componentInfo);
    return (
      this.myHttp
        .post(
          `${environment.apiBase}/api/login`,

          // Form body information to send to the back end (req.body)
          {
            loginEmail: componentInfo.email,
            loginPassword: componentInfo.password
          },

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json())
    );
  } // close login()
  logout() {
    console.log("LOGOUT SERVICE TRIGGERED");
    return (
      this.myHttp
        .post(
          `${environment.apiBase}/api/logout`,

          // Nothing to send to the back end (req.body)
          {},

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json())
    );
  } // close logout()
  checklogin() {
    return (
      this.myHttp
        .get(
          `${environment.apiBase}/api/checklogin`,

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json())
    );
  } // close checklogin()
}