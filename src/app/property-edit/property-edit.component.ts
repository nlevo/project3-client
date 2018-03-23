import { element } from 'protractor';
import { Property } from './../interfaces/property';
import { Component, OnInit } from '@angular/core';
import { PropertyEntriesService } from '../services/property-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/authentification-service.service';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css'],
  providers: [PropertyEntriesService],
})
export class PropertyEditComponent implements OnInit {

  public myForm: FormGroup; // our form model
  public isDataAvailable: boolean = false;
  public property;
  public errorMessage: String;

  constructor(
    private propertiesService: PropertyEntriesService,
    private myRouter: Router,
    private _fb: FormBuilder,
    private myRoute: ActivatedRoute,
    private myAuthService: AuthService,

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
    })
    // we will initialize our form here

    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      building: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      bedrooms: this._fb.array([
        this.initBedroom(),
      ]),
      isActive: [false],
      address: this._fb.group({
        street: '',
        city: '',
        state: '',
        zip: '',
      }),
      effective_date: ['', [Validators.required]],
      end_date: Date,
      floor_plan: Number,
      max_occupancy: Number,
      comments: '',
      special_instructions: this._fb.array([
        this.initInstruction(),
      ]),
      tier: 'Standard',
      bathrooms: Number
    })


  }

  ///////////INIT/////////////
  initBedroom() {
    // initialize our bedroom
    return this._fb.group({
      bedroom_type: '',
      bedsize1: "",
      bedsize2: "",
      bedsize3: "",
      bedsize4: ""
    });
  }

  initBedsize() {
    // initialize our bedsize
    return this._fb.group({
      bedsize: ''
    });
  }

  initInstruction() {
    // initialize our instruction
    return this._fb.group({
      instruction: '',
    });
  }
  ///////////INIT-END////////

  ///////////ADD/////////////
  addBedroom() {
    // add bedroom to the list
    const control = this.myForm.get('bedrooms') as FormArray;
    control.push(this.initBedroom());
  }

  addInstruction() {
    // add instruction to the list
    const control = <FormArray>this.myForm.controls['special_instructions'];
    control.push(this.initInstruction());
  }
  ///////////ADD-END/////////////

  ///////////REMOVE/////////////
  removeBedroom(i: number) {
    // remove bedroom from the list
    const control = <FormArray>this.myForm.controls['bedrooms'];
    control.removeAt(i);
  }

  removeInstruction(i: number) {
    // remove instruction from the list
    const control = <FormArray>this.myForm.controls['special_instructions'];
    control.removeAt(i);
  }

  ///////////REMOVE-END////////

  update(id, model: Property) {
    // call API to uodate property
    //console.log("THIS IS ID: ", id);
    console.log("THIS IS MODEL: ", model['value']);
    this.propertiesService.updateProperty(id, model['value'])
      .toPromise()
      .then(() => {
        this.myRouter.navigate([`/properties/${id}`])
      })
      .catch()
  }

  getProperty(id) {
    this.propertiesService.getPropertyById(id).then(thePropertyDetails => {
      this.property = thePropertyDetails;
      this.isDataAvailable = true;
      //console.log("THIS PROPERTY: ", this.property);
      this.property.bedrooms.forEach((element, index, array) => {
        if (index < array.length - 1) {
          this.addBedroom();
        }
      });
      this.property.special_instructions.forEach((element, index, array) => {
        if (index < array.length - 1) {
          this.addInstruction();
        }
      });

      //have to remove time and seconds from the date strings, otherwise html date tag won't show it
      if (this.property.effective_date) {
        this.property.effective_date = this.property.effective_date.slice(0, -14);
      }
      if (this.property.end_date) {
        this.property.end_date = this.property.end_date.slice(0, -14);
      }
      this.myForm.patchValue(this.property);
    });
  }



}