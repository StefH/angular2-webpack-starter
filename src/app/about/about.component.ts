import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http } from '@angular/http';

@Component({
  selector: 'about',
  styles: [`
  `],
  template: `
    <h1>About</h1>
    <div>
      For hot module reloading run
      <pre>npm run start:hmr</pre>
    </div>
    <div>
      <h3>
        patrick@AngularClass.com
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
  `
})
export class AboutComponent implements OnInit {

  public localState: any;
  constructor(public route: ActivatedRoute, private http: Http) { }

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')

    let o = this.test();

    o.subscribe((x) => {
      console.log('test Next: %s', JSON.stringify(x));
    });

    this.asyncDataWithWebpack();
  }

  private test(): Observable<any> {

    let character = this.http.get('https://swapi.co/api/people/1').map((res) => res.json());
    let characterHomeworld = this.http.get('http://swapi.co/api/planets/1').map((res) => res.json());

    let ob = Observable.forkJoin([character, characterHomeworld]).map((results) => {
      // results[0] is our character
      // results[1] is our character homeworld
      let o: any = {};
      results.forEach((data) => {
        // o = Object.assign(o, data);
        o[data.name] = data;
      });

      console.log('loop done'); // + JSON.stringify(o));
      return o;
      // results[0].homeworld = results[1];
      // this.loadedCharacter = results[0];
    });

    console.log('func done');
    return ob;

    // let o: any = {};
    // let source = Observable.forkJoin(
    //   Observable.from([1]),
    //   Observable.from([2]),
    //   (x, y) => { return x + y; }
    // );

    // return source;
  }

  private asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then((json) => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }

}
