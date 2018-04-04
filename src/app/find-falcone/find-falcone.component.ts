import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CommonServiceService } from './../common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-falcone',
  templateUrl: './find-falcone.component.html',
  styleUrls: ['./find-falcone.component.css']
})
export class FindFalconeComponent implements OnInit {

  protected searchStr = ['', '', '', ''];
  protected dataService: CompleterData;
  protected planetData: any;
  protected planetDistance = [];
  protected selectedPlanet: String = '';
  protected planetSearchData = [];
  protected vehicleData = [];
  protected requestData = {
    planet_names: [],
    vehicle_names: []
  };
  protected selectedVehicle = [];
  timeTaken = 0;

  constructor(private completerService: CompleterService, private commServ: CommonServiceService, private router: Router) {
    this.commServ.planetData.subscribe(next => this.updatedPlanetData(next));
    this.commServ.vehicleData.subscribe(next => this.updatedVehicleData(next));
    this.commServ.reset.subscribe(next => this.resetData());
  }

  ngOnInit() {
    this.getPlanetsData();
    this.getVehicleData();
  }

  getPlanetsData(): void {
    this.commServ.getPlanets().subscribe(
      data => {
        this.commServ.planetData.next(data);
        this.planetData = JSON.parse(JSON.stringify(data));
      },
      error => console.log(error)
    );
  }

  getVehicleData(): void {
    this.commServ.getVehicles().subscribe(
      data => {
        this.commServ.vehicleData.next(data);
      },
      error => console.log(error)
    );
  }

  updatedPlanetData(value): void {
    this.planetSearchData = value;
    this.dataService = this.completerService.local(this.planetSearchData, 'name', 'name');
  }

  updatedVehicleData(value): void {
    this.vehicleData = value;
  }

  getCurrentPlanet(index) {
    this.selectedPlanet = this.searchStr[index];
  }

  updatePlanetList(index) {
    const self = this;
    if (this.selectedPlanet && this.selectedPlanet !== '' && this.searchStr[index] === '') {
      for (let x = 0; x < this.planetData.length; x++) {
        if (this.planetData[x].name === this.selectedPlanet) {
          this.planetSearchData.push(this.planetData[x]);
          this.requestData.planet_names[index] = '';
          this.planetDistance[index] = '';
          if (this.requestData.vehicle_names[index]) {
            const obj = this.vehicleData.find(function (e) {
              if (e.name === self.requestData.vehicle_names[index]) {
                e.total_no++;
                self.selectedVehicle[index] = '';
                return e;
              }
            });
          }
          break;
        }
      }
    }
  }

  updatePlanetReq(index) {
    if (this.searchStr[index] && this.searchStr[index] !== '') {
      const obj = this.planetSearchData.find(o => o.name === this.searchStr[index]);
      if (obj) {
        this.planetDistance[index] = obj.distance;
        this.requestData.planet_names[index] = obj.name;
        this.removeByAttr(this.planetSearchData, 'name', obj.name);
        this.commServ.planetData.next(this.planetSearchData);
      }
    }
  }

  selectVehicle(index, vehicleName): void {
    const self = this;
    if (this.selectedVehicle[index]) {
      const obj = this.vehicleData.find(function (el) {
        if (el.name === self.selectedVehicle[index]) {
          el.total_no--;
          self.selectedVehicle[index] = vehicleName;
          if (self.requestData.vehicle_names[index]) {
            const val = self.vehicleData.find(function (e) {
              if (e.name === self.requestData.vehicle_names[index]) {
                e.total_no++;
                return e;
              }
            });
          }
          self.requestData.vehicle_names[index] = vehicleName;
          return el;
        }
      });
    }
    this.calulateTime();
  }

  calulateTime(): void {
    let index = 0;
    let self = this;
    this.timeTaken = 0;
    this.requestData.planet_names.forEach(e => {
      const obj = self.planetData.find(function (e1) {
        if (e === e1.name) {
          const v = self.vehicleData.find(function (e2) {
            if (e2.name === self.requestData.vehicle_names[index]) {
              self.timeTaken = self.timeTaken + ((e1.distance) / (e2.speed));
              return e2;
            }
          });
          return e1;
        }
      });
      index++;
    });
  }

  findFalcone(): void {
    this.commServ.requestData = this.requestData;
    this.commServ.getFalcon().subscribe(
      data => {
        console.log(data);
        this.router.navigate(['success']);
      },
      error => {
        console.log(error);
        this.router.navigate(['failure']);
      }
    );
  }

  resetData(): void {
    this.searchStr = ['', '', '', ''];
    this.planetDistance = [];
    this.selectedPlanet = '';
    this.requestData = {
      planet_names: [],
      vehicle_names: []
    };
    this.selectedVehicle = [];
    this.timeTaken = 0;
  }

  removeByAttr(arr, attr, value): any {
    let i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
}
