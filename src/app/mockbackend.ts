import { Person, Weight } from './models';
import { Injectable } from '@angular/core';

import { Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


@Injectable()
export class MockService {
    MockDb: Person[] = [
        {Id: 1, FullName: 'Person A', Weights: [
            // 2017
            { Id: 1, Kg: 70, Date: new Date('2017-01-31'), PersonId: 1 },
            { Id: 2, Kg: 72, Date: new Date('2017-02-28'), PersonId: 1 },
            { Id: 3, Kg: 71, Date: new Date('2017-03-31'), PersonId: 1 },
            {Id: 4, Kg: 73, Date: new Date('2017-04-30'), PersonId: 1},
            {Id: 5, Kg: 72, Date: new Date('2017-05-31'), PersonId: 1},
            {Id: 6, Kg: 75, Date: new Date('2017-06-30'), PersonId: 1},
            {Id: 7, Kg: 74, Date: new Date('2017-07-31'), PersonId: 1},
            {Id: 8, Kg: 76, Date: new Date('2017-08-31'), PersonId: 1},
            {Id: 9, Kg: 77, Date: new Date('2017-09-30'), PersonId: 1},
            {Id: 10, Kg: 77, Date: new Date('2017-10-31'), PersonId: 1},
            {Id: 11, Kg: 77, Date: new Date('2017-11-3'), PersonId: 1},
            {Id: 12, Kg: 77, Date: new Date('2017-12-31'), PersonId: 1},
            // 2016
            { Id: 13, Kg: 70, Date: new Date('2016-01-31'), PersonId: 1 },
            { Id: 14, Kg: 72, Date: new Date('2016-02-28'), PersonId: 1 },
            { Id: 15, Kg: 71, Date: new Date('2016-03-31'), PersonId: 1 },
            {Id: 16, Kg: 73, Date: new Date('2016-04-30'), PersonId: 1},
            {Id: 17, Kg: 72, Date: new Date('2016-05-31'), PersonId: 1},
            {Id: 18, Kg: 75, Date: new Date('2016-06-30'), PersonId: 1},
            {Id: 19, Kg: 74, Date: new Date('2016-07-31'), PersonId: 1},
            {Id: 20, Kg: 76, Date: new Date('2016-08-31'), PersonId: 1},
            {Id: 21, Kg: 77, Date: new Date('2016-09-30'), PersonId: 1},
            {Id: 22, Kg: 77, Date: new Date('2016-10-31'), PersonId: 1},
            {Id: 23, Kg: 77, Date: new Date('2016-11-3'), PersonId: 1},
            {Id: 24, Kg: 77, Date: new Date('2016-12-31'), PersonId: 1}
        ]},
         {Id: 2, FullName: 'Person B', Weights: [
            { Id: 1, Kg: 69, Date: new Date('2017-01-31'), PersonId: 2 },
            { Id: 2, Kg: 67, Date: new Date('2017-02-28'), PersonId: 2 },
            { Id: 3, Kg: 65, Date: new Date('2017-03-31'), PersonId: 2 },
            {Id: 4, Kg: 65, Date: new Date('2017-04-30'), PersonId: 2},
            {Id: 5, Kg: 66, Date: new Date('2017-05-31'), PersonId: 2},
            {Id: 6, Kg: 65, Date: new Date('2017-06-30'), PersonId: 2},
            {Id: 7, Kg: 66, Date: new Date('2017-07-31'), PersonId: 2},
            {Id: 8, Kg: 63, Date: new Date('2017-08-31'), PersonId: 2},
            {Id: 9, Kg: 62, Date: new Date('2017-09-30'), PersonId: 2},
            {Id: 10, Kg: 64, Date: new Date('2017-10-31'), PersonId: 2},
            {Id: 11, Kg: 61, Date: new Date('2017-11-30'), PersonId: 2},
            {Id: 12, Kg: 61, Date: new Date('2017-12-31'), PersonId: 2}
        ]},
        {Id: 3, FullName: 'Person C', Weights: [
            { Id: 1, Kg: 80, Date: new Date('2017-01-31'), PersonId: 3 },
            { Id: 2, Kg: 81, Date: new Date('2017-02-28'), PersonId: 3 },
            { Id: 3, Kg: 83, Date: new Date('2017-03-31'), PersonId: 3 },
            {Id: 4, Kg: 81, Date: new Date('2017-04-30'), PersonId: 3},
            {Id: 5, Kg: 79, Date: new Date('2017-05-31'), PersonId: 3},
            {Id: 6, Kg: 77, Date: new Date('2017-06-30'), PersonId: 3},
            {Id: 7, Kg: 78, Date: new Date('2017-07-31'), PersonId: 3},
            {Id: 8, Kg: 77.5, Date: new Date('2017-08-31'), PersonId: 3},
            {Id: 9, Kg: 75, Date: new Date('2017-09-30'), PersonId: 3},
            {Id: 10, Kg: 75, Date: new Date('2017-10-31'), PersonId: 3},
            {Id: 11, Kg: 76, Date: new Date('2017-11-30'), PersonId: 3},
            {Id: 12, Kg: 75, Date: new Date('2017-12-31'), PersonId: 3}
        ]}
];

    constructor(private backend: MockBackend) {
        backend.connections.subscribe((c: MockConnection) => {
            switch (c.request.method) {
                // return all the data for the year requested
                case RequestMethod.Get:
                    // GET: /people/:year
                    console.log('Get mock');
                    if (c.request.url.indexOf('people') > 0) {
                        const year = +this.getUrlParam(c.request.url, 1);
                        // console.log(year);
                        const res = new Response(
                            new ResponseOptions({
                                body: JSON.stringify(this.getPeopleByYear(year))
                            })
                        );
                        c.mockRespond(res);
                    };
                    break;
                case RequestMethod.Post:
                    // POST: /people/:year
                    console.log('Post mock');
                    if (c.request.url.match(/\/people/)) {
                        const newPerson: Person = JSON.parse(c.request.getBody());
                        const year = +this.getUrlParam(c.request.url, 1);
                        newPerson.Id = this.MockDb.length + 1;
                        newPerson.FullName = 'name';
                        newPerson.Weights = [];
                        console.log(newPerson);
                        this.MockDb.push(newPerson);
                        const res = new Response(
                            new ResponseOptions({
                                body: JSON.stringify(this.getPeopleByYear(year))
                            })
                        );
                        c.mockRespond(res);
                    }
                    break;
                case RequestMethod.Put:
                    console.log('Put mock');
                    break;
                case RequestMethod.Delete:
                    // DELETE /people/:year/:id
                    console.log('Delete mock');
                    if (c.request.url.match(/\/people\/\d{4}\/\d+$/)) {
                        const id = +this.getUrlParam(c.request.url, 1);
                        const year = +this.getUrlParam(c.request.url, 2);
                        for (let i = 0; i < this.MockDb.length; i++) {
                            const person = this.MockDb[i];
                            if (person.Id === id) {
                                this.MockDb.splice(i, 1);
                            }
                        };
                        const res = new Response(
                            new ResponseOptions({
                                body: JSON.stringify(this.getPeopleByYear(year))
                            })
                        );
                        c.mockRespond(res);
                    }
                    break;
                default:
                // do nothing
            }
        });
    }

    private getPeopleByYear(year: number) {
        const filteredMockDb: Person[] = this.MockDb;
        let index: number;

        for (const p of filteredMockDb) {
           console.log(p.FullName);
            index = 0;
            for (const w of p.Weights) {
               console.log(w);
               if (w.Date.getFullYear() !== year) {
                   p.Weights.splice(index);
               }
               index ++;
            }
         }
        return filteredMockDb;

    }

    private getUrlParam(url: string, fromEnd: number) {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - fromEnd];
    }
// tslint:disable-next-line:eofline
}