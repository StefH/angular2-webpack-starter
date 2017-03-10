import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { PrimeCar } from './primeCar';
import { CarService } from './carservice';
import { LazyLoadEvent } from 'primeng/primeng';

console.log('`CarGrid` component loaded asynchronously');

@Component({
    // moduleId: module.id,     fully resolved filename; defined at module load time
    templateUrl: './carGrid.component.html',
    selector: 'my-car-grid',
    providers: [ CarService ],
    styleUrls: [ './carGrid.component.css']
})
export class CarGridComponent implements OnInit {

    public displayDialog: boolean;

    public emptyMessage: string = 'nothing to see here';

    public car: Car = new PrimeCar();

    public selectedCar: Car;

    public newCar: boolean;

    public cars: Car[] = [];

    public datasource: Car[] = [];

    public totalRecords: number;

    public filter: LazyLoadEvent;

    public isDataLoading: boolean = true;

    constructor(private carService: CarService) {
    }

    public ngOnInit() {
        console.log('hello `CarGridComponent` component');
    }

    public loadCarsLazy(event: LazyLoadEvent) {
        // in a real application, make a remote request to load data using state metadata from event
        // event.first = First row offset
        // event.rows = Number of rows per page
        // event.sortField = Field name to sort with
        // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        // filters: FilterMetadata object having field as key and filter value filter matchMode as value

        console.log('event = ' + JSON.stringify(event));
        this.filter = event;

        this.getPagedData(event);
    }

    public showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }

    public save() {
        if (this.newCar) {
            this.cars.push(this.car);
        } else {
            this.cars[this.findSelectedCarIndex()] = this.car;
        }

        this.car = null;
        this.displayDialog = false;
    }

    public delete() {
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    }

    public onRowSelect(event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    public cloneCar(c: Car): Car {
        let car = new PrimeCar();
        for (let prop in c) {
            if (c.hasOwnProperty(prop)) {
                car[prop] = c[prop];
            }
        }
        return car;
    }

    public findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }

    private getPagedData(event: LazyLoadEvent) {
        this.isDataLoading = true;
        setTimeout(() => {
        this.carService.getCarsMedium().subscribe((cars) => {
            console.log('`getCarsMedium`');

            this.datasource = cars;
            this.totalRecords = this.datasource.length;
            this.cars = this.datasource.slice(event.first, (event.first + event.rows));
            this.isDataLoading = false;
        });
        }, 1000);
    }
}
