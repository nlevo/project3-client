import { AuthService } from './../services/authentification-service.service';
import { Component, OnInit } from '@angular/core';
import { PropertyEntriesService } from '../services/property-service.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  
  public isDataAvailable:boolean = false;  


  property;
  // property = { 
  //   name: "", 
  //   building: "", 
  //   unit: "",
  //   isActive: false,
  //   address: {
  //     apartment_num: "",
  //     street: "",
  //     city: "",
  //     state: "",
  //     zip: "",
  //   },
  //   effective_date: Date,
  //   end_date: Date,
  //   floor_plan: Number,
  //   max_occupancy: Number,
  //   comments: "",
  //   special_instructions: "",
  //   rating: "Standard",
  //   bathrooms: Number,
  //   owned_by: "",
  //   bedrooms: []
  // }

  errorMessage: String;

  constructor(
    private propertiesService: PropertyEntriesService, 
    private myRouter: Router,
    private myAuthService: AuthService,
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
        this.myRouter.navigate(["/login"]);
      });
    this.myRoute.params.subscribe(params => {
      this.getProperty(params["id"]);
    });
  }

  getProperty(id) {
    this.propertiesService.getPropertyById(id).then(thePropertyDetails => {
      this.property = thePropertyDetails;
      this.isDataAvailable = true;
      console.log("THIS PROPERTY: ",this.property);
    });
  }
}