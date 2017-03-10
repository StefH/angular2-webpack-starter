import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Event, NavigationStart } from '@angular/router';

export class MockRouter {
    public events: Observable<Event>;

    // http://stackoverflow.com/questions/35343183/rxjs-control-observable-invocation
    constructor() {
        let event = new NavigationStart(1, '/');
        this.events = Observable.of(event).publish();
    }
}
