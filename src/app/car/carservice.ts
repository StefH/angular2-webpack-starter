import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Car } from './car';

@Injectable()
export class CarService {

    constructor(private http: Http) {}

    public getCarsMedium() {
        return this.http.get('app/car/cars-medium.json')
          .map((response) => <Car[]> response.json().data);
    }
}
