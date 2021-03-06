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
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

 const Mock = {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions, XHRBackend, MockService],
      useFactory: (mockBackend, options, realBackend) => {return new Http(mockBackend, options); }
    };

@NgModule({
  declarations: [
    AppComponent,
    LineChartDemoComponent,
    WeightsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase, 'WhoAteAllThePies'),
    AngularFireDatabaseModule
  ],
  providers: [
    PeopleService,
    BaseRequestOptions,
    MockBackend,
    MockService,
    Mock
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
