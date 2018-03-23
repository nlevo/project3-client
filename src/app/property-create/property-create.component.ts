import { Property } from './../interfaces/property';
import { Component, OnInit } from '@angular/core';
import { PropertyEntriesService } from '../services/property-service.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css'],
  providers: [PropertyEntriesService],
})
export class PropertyCreateComponent implements OnInit {

  public myForm : FormGroup; // our form model
  public isReady: boolean;

  // property = { 
  //   name: "", 
  //   building: "", 
  //   unit: "",
  //   isActive: false,
  //   address: [{
  //     apartment_num: "",
  //     street: "",
  //     city: "",
  //     state: "",
  //     zip: "",
  //   }],
  //   effective_date: [Date, [Validators.required]],
  //   end_date: Date,
  //   floor_plan: Number,
  //   max_occupancy: Number,`
  //   comments: "",
  //   special_instructions: "",
  //   rating: "Standard",
  //   bathrooms: Number,
  //   owned_by: "",
  //   bedrooms: ""
  // }

  errorMessage: String;

  constructor(
    private propertiesService: PropertyEntriesService, 
    private myRouter: Router,
    private _fb: FormBuilder
    
  ) { }

  ngOnInit() {
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
          apartment_num: '',
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
  this.isReady = true;
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



  save(model: Property) {
    // call API to save customer
    this.propertiesService.createProperty(model['value'])
    .then(
        (res) => {
          this.myRouter.navigate(['/properties'])
        }
      )
      .catch(
        err => this.errorMessage = err
      )
    console.log("MODEL:", model['value']);
  }
}