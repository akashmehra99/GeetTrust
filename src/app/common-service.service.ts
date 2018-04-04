import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommonServiceService {

  planetData = new Subject();
  vehicleData = new Subject();
  reset = new Subject();
  requestData;

  constructor(private http: Http) { }

  getPlanets(): Observable<any> {
    return this.http.get('https://findfalcone.herokuapp.com/planets')
    .map(this.extractData).catch(this.handleErrorObservable);
  }

  getVehicles(): Observable<any> {
    return this.http.get('https://findfalcone.herokuapp.com/vehicles')
    .map(this.extractData).catch(this.handleErrorObservable);
  }

  getFalcon(): Observable<any> {
    return this.http.post('https://findfalcone.herokuapp.com/find', this.requestData)
    .map(this.extractData).catch(this.handleErrorObservable);
  }

  resetData(): void {
    this.reset.next();
  }

  extractData(res: Response) {
    return (res.json()) || {};
  }

  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
