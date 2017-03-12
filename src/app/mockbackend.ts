import { Person } from './models';
import { Injectable } from '@angular/core';

import { Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

export const MockDb: Person[] = [
    
        {Id: 1, FullName: 'Barry Sanders', Weights: [
            { Id: 1, Kg: 70, Date: new Date('2017-01-31'), PersonId: 1 },
            { Id: 2, Kg: 72, Date: new Date('2017-01-31'), PersonId: 1 },
            { Id: 3, Kg: 71, Date: new Date('2017-01-31'), PersonId: 1 },
            {Id: 4, Kg: 73, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 5, Kg: 72, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 6, Kg: 75, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 7, Kg: 74, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 8, Kg: 76, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 9, Kg: 77, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 10, Kg: 77, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 11, Kg: 77, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 12, Kg: 77, Date: new Date('2017-01-31'), PersonId: 1}
        ]},
         {Id: 1, FullName: 'Duncan Hunter', Weights: [
            { Id: 1, Kg: 69, Date: new Date('2017-01-31'), PersonId: 1 },
            { Id: 2, Kg: 67, Date: new Date('2017-01-31'), PersonId: 1 },
            { Id: 3, Kg: 65, Date: new Date('2017-01-31'), PersonId: 1 },
            {Id: 4, Kg: 65, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 5, Kg: 66, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 6, Kg: 65, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 7, Kg: 66, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 8, Kg: 63, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 9, Kg: 62, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 10, Kg: 64, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 11, Kg: 61, Date: new Date('2017-01-31'), PersonId: 1},
            {Id: 12, Kg: 61, Date: new Date('2017-01-31'), PersonId: 1}
        ]}
];

@Injectable()
export class MockService {
    constructor(private backend: MockBackend) {
        backend.connections.subscribe((c) => {
            switch (c.request.method) {
                case RequestMethod.Get:
                    if (c.request.url.indexOf('people') > 0) {
                        let res = new Response(new ResponseOptions({
                            body: JSON.stringify(MockDb)
                        }));
                        c.mockRespond(res);
                    }
            }
        });
    }
}