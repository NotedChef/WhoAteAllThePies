import { PeopleService } from './people/people.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { WeightsComponent } from './weights/weights.component';
import { MockBackend } from '@angular/http/testing';
import { MockService } from './mockbackend';
import { LineChartDemoComponent } from './line-chart-demo/line-chart-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    WeightsComponent,
    LineChartDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [PeopleService,
    BaseRequestOptions,
    MockBackend,
    MockService,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions, XHRBackend, MockService],
      useFactory: (mockBackend, options, realBackend) => {return new Http(mockBackend, options); }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
