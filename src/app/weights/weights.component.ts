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
  chart: Chart = new Chart();
  selectedYear: number = this.date.getFullYear();
  colors: string[] = ['red', 'blue', 'green', 'orange', 'pink', 'gold', 'purple', 'rose'];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.get(this.date);
  }

  get(date: Date) {
    this.peopleService.get(date)
      .subscribe(people => {
        this.people = people;
        this.formatChartData();
      }
      );
  }

  formatChartData() {
    const chartData = [];
    const chartLabels = [];
    this.people.forEach((person) => {
      chartData.push(
        { data: person.Weights.map((w) => { return (w.Kg); }), label: person.FullName }
      );
    });
    this.chart.chartData = chartData;
    this.chart.chartLabels = this.months;
    this.chart.chartType = 'line';
    this.chart.chartLegend = true;
    this.chart.chartOptions = {
      responsive: true
    };
    this.chart.chartColors = this.colors.map((color) => {
      return {
        fillColor: 'rgba(220,220,220, 0.1)',
        strokeColor: color,
        pointColor: color,
        borderColor: color,
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: color
      };
    });
    // this.chart.chartColors = [
    //   { // grey
    //     backgroundColor: 'rgba(148,159,177,0.2)',
    //     borderColor: 'rgba(148,159,177,1)',
    //     pointBackgroundColor: 'rgba(148,159,177,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //   },
    //   { // dark grey
    //     backgroundColor: 'rgba(77,83,96,0.2)',
    //     borderColor: 'rgba(77,83,96,1)',
    //     pointBackgroundColor: 'rgba(77,83,96,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(77,83,96,1)'
    //   },
    //   { // grey
    //     backgroundColor: 'rgba(148,159,177,0.2)',
    //     borderColor: 'rgba(148,159,177,1)',
    //     pointBackgroundColor: 'rgba(148,159,177,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //   }
    // ]

  }
}

