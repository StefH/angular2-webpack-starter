import { Component, OnInit } from '@angular/core';

console.log('`Car` component loaded asynchronously');

@Component({
    templateUrl: './car.component.html'
})
export class CarComponent implements OnInit {
    constructor() {
        console.log('constructor CarComponent');
    }

    public ngOnInit() {
        // No code
    }
}
