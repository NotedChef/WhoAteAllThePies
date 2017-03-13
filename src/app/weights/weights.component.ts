import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { PeopleService } from '../people/people.service';
import { Person, Chart } from '../models';
// import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-weights',
  templateUrl: './weights.component.html',
  styleUrls: ['./weights.component.css']
})
export class WeightsComponent implements OnInit {
  months: string[] = moment.monthsShort();
  date: Date = new Date();
  people: Person[];
  // chart = new Chart();
  selectedYear = this.date.getFullYear();
  colors = ['red', 'blue', 'green', 'orange', 'pink', 'gold', 'purple', 'rose'];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.get(this.date);
  }

  get(date: Date) {
    this.peopleService.get(date)
      .subscribe(people => {
        this.people = people;
        // this.formatChartData();
      }
      );
  }

//   formatChartData() {
//     const chartData = [];
//     const chartLabels = [];
//     this.people.forEach((person) => {
//       chartData.push(
//         {data: person.Weights.map((w) => {return (w.Kg); }), label: person.FullName}
//         );
//     });
//     this.chart.chartData = chartData;
//     this.chart.chartLabels = this.months;
//     this.chart.chartType = 'Line';
//     // this.chart.chartOptions = {
//     //   responsive: true,
//     //   // multiTootipTemplate: '<%= datasetLabel %> - <%= value %>'
//     // };
//     // this.chart.chartColors = this.colors.map((color) => {
//     //   return {
//     //     fillColor: 'rgba(220,220,220, 0.1)',
//     //     strokeColor: color,
//     //     pointColor: color,
//     //     pointStrokeColor: '#fff',
//     //     pointHiglightFill: '#fff',
//     //     pointHiglightStroke: color
//     //   };
//     // });
//   }
}

