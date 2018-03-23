import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PropertyEntriesService {
  
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getProperties(){
    return this.http.get(`${environment.apiBase}/api/properties`, { withCredentials: true })
      .toPromise()
      .then((res: Response) => res.json())
  }

  getPropertyById(id){
    return this.http.get(`${environment.apiBase}/api/properties/${id}`, { withCredentials: true })
      .toPromise()
      .then((res: Response) => res.json())
  }

  createProperty(property){
    const stringified = JSON.stringify(property);
    //console.log("STRINGIFY", stringified);
    const options = { headers: this.headers, withCredentials: true };
    //console.log("SERVICE PROPERTY:",property);
    return this.http.post(
      `${environment.apiBase}/api/properties`, 
      stringified,
      options
    )
      .toPromise()
      .then((response: Response) => response.json())
      .catch((error: Response) => Promise.reject(error ))
  }
  updateProperty(id, updates){
    return this.http.put(`${environment.apiBase}/api/properties/${id}`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deleteProperty(id){
    return this.http.delete(`${environment.apiBase}/api/properties/${id}`,
        { withCredentials: true })
        .toPromise()
        .then((response: Response) => response.json())
        .catch((error: Response) => Promise.reject(error ))
        
  }
}