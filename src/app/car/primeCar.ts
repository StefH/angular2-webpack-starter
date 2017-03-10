import { Car } from './car';

export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) {}
}
