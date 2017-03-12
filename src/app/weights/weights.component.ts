import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { PeopleService } from '../people/people.service';
import { Person, Chart } from '../models';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-weights',
  templateUrl: './weights.component.html',
  styleUrls: ['./weights.component.css']
})
export class WeightsComponent implements OnInit {
  months: string[] = moment.monthsShort();
  date: Date = new Date();
  people: Person[];
  chart = new Chart();

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.get(this.date);
  }

  get(date: Date) {
    this.peopleService.get(date)
      .subscribe(people => {
        this.people = people;
        this.formatChartDate();
      }
      );
  }

  formatChartData() {
    let chartData[];
    
    this.people.forEach((person) => {
      chartData.push(person.Weights.map(w => {
        return w.Kg;
      })
    })
  }

}
