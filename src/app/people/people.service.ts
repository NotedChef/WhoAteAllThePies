import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {
  api: string = 'http://pigofthemonth.com/api';
  constructor(private http: Http) { }

  get(date:Date): any {
    // return this.http.get(`${this.api}/people/GetPersonsByYear/${date.toISOString()}`)
    return this.http.get(`${this.api}/people/GetPersonByYear/${date}`)
    .map((response: Response) => response.json());
  }
}
