import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Person } from '../models';

@Injectable()
export class PeopleService {
  // tslint:disable-next-line:no-inferrable-types
  api: string = 'http://pigofthemonth.com/api';
  headers: Headers;

  constructor(private http: Http) {
    this.makeHeaders();
  }

  get(date: Date): Observable<Person[]> {
    // return this.http.get(`${this.api}/people/GetPersonsByYear/${date.toISOString()}`)
    return this.http.get(`${this.api}/people/GetPersonByYear/${date}`)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  create(person: Person, year: Number): Observable<Person> {
    // return this.http.get(`${this.api}/people/GetPersonsByYear/${date.toISOString()}`)
    return this.http.post(`${this.api}/people/${year}`,
      JSON.stringify(person), { headers: this.headers }
    )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  put(people: Person[]): Observable<Person[]> {
    // return this.http.get(`${this.api}/people/GetPersonsByYear/${date.toISOString()}`)
    return this.http.post(`${this.api}/people`,
      JSON.stringify(people), { headers: this.headers }
    )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  delete(person) {
    return this.http.delete(`${this.api}/people/${person.Id}`,
      { headers: this.headers })
      .map((response: Response) => response.json());
  }

  makeHeaders() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.headers = headers;
  }

  private handleError(error: Response) {
    console.error('CUSTOM ERROR!!!!', error);
    return Observable.throw(error);
  }
}
