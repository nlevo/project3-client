import { element } from 'protractor';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyEntriesService } from '../services/property-service.service';


@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css'],
  providers: [PropertyEntriesService],
})
export class PropertyTableComponent implements OnInit {
  properties: Object[]
  property: {}

  eliteTierCount = 0;
  prefferedTierCount = 0;
  standardTierCount = 0;
  bedCounter;
  kingCount = 0;
  queenCount = 0;
  twinCount = 0;


  constructor(
    private propertiesService: PropertyEntriesService,
    private myRouter: Router,
  ) { }

  ngOnInit() {
    this.propertiesService.getProperties()
      .then((res) => {
        this.properties = res;
        this.updateCounters();
      })
  }

  updateCounters() {
    this.countBeds();
    this.countTiers();
  }

  countTiers() {
    this.eliteTierCount = this.properties.filter(property => property['tier'] === 'Elite').length;
    //console.log("Elites", this.eliteTierCount);
    this.prefferedTierCount = this.properties.filter(property => property['tier'] === 'Preffered').length;
    //console.log("Preffered", this.prefferedTierCount);
    this.standardTierCount = this.properties.filter(property => property['tier'] === 'Standard').length;
    //console.log("Standard", this.standardTierCount);
  }

  countBeds() {
    //reset counters
    this.kingCount = 0;
    this.queenCount = 0;
    this.twinCount = 0;

    this.bedCounter = this.properties.filter(property => property['bedrooms'].length > 0);
    this.bedCounter.forEach(element => {
      element['bedrooms'].forEach(element2 => {

        if (element2['bedsize1'] === 'King')
          this.kingCount++;
        else if (element2['bedsize1'] === 'Queen')
          this.queenCount++;
        else if (element2['bedsize1'] === 'Twin')
          this.twinCount++;

        if (element2['bedsize2'] === 'King')
          this.kingCount++;
        else if (element2['bedsize2'] === 'Queen')
          this.queenCount++;
        else if (element2['bedsize2'] === 'Twin')
          this.twinCount++;

        if (element2['bedsize3'] === 'King')
          this.kingCount++;
        else if (element2['bedsize3'] === 'Queen')
          this.queenCount++;
        else if (element2['bedsize3'] === 'Twin')
          this.twinCount++;

        if (element2['bedsize4'] === 'King')
          this.kingCount++;
        else if (element2['bedsize4'] === 'Queen')
          this.queenCount++;
        else if (element2['bedsize4'] === 'Twin')
          this.twinCount++;
      });
    });
    this.bedCounter = [];
    console.log("King:", this.kingCount);
    console.log("Queen:", this.queenCount);
    console.log("Twin:", this.twinCount);
  }

  deleteThisProperty(id) {
    //console.log("ID is: ",id);
    if (!confirm("Are you sure?")) {
      return;
    }

    this.propertiesService
      .deleteProperty(id)
      .then(() => {
        console.log("Success");
        //console.log(this.properties);
        this.propertiesService.getProperties()
          .then((res) => {
            this.properties = res;
            this.updateCounters();
          })
        //this.myRouter.navigate(["/properties"]);
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("Phone Delete Error");
        console.log(err);
      });
  }
}