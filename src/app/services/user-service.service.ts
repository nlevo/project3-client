import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserServiceService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getUsers(){
    return this.http.get(`${environment.apiBase}/api/users`, { withCredentials:true} )
      .toPromise()
      .then((res: Response) => res.json())
  }

  getUser(id){
    return this.http.get(`${environment.apiBase}/api/users/${id}`, { withCredentials:true} )
      .toPromise()
      .then((res: Response) => res.json())
  }

  createNewUser(userData){
    return this.http.post( `${environment.apiBase}/api/users/new`, userData,
    { withCredentials: true })
    .toPromise()
    .then( res => res.json() )
  }

  deleteUser(id){
    return this.http.delete(`${environment.apiBase}/api/users/${id}`,
        { withCredentials: true })
        .toPromise()
  }

  updateUser(id, updates){
    return this.http.put(`${environment.apiBase}/api/users/${id}`, updates, { withCredentials: true })
    .map(res => res.json());
  }

}