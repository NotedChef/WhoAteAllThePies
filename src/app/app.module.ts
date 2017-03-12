import { PeopleService } from './people/people.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { WeightsComponent } from './weights/weights.component';
import { MockBackend } from '@angular/http/testing';
import { MockService } from './mockbackend';

@NgModule({
  declarations: [
    AppComponent,
    WeightsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PeopleService,
    BaseRequestOptions,
    MockBackend,
    MockService,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions, XHRBackend, MockService],
      useFactory: (mockBackend, options, realBackend) => new Http(mockBackend, options)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
