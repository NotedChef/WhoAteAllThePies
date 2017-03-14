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
      });
  }

  save() {
    console.log('People saved');
    // this.peopleService.put(this.people)
    //   .subscribe(people => {
    //   });
  }

  create() {
    // const person = new Person();
    console.log('New person created');
    // this.peopleService.create(person, this.selectedYear)
    //   .subscribe(person => {
    //     this.people = [...this.people, person];
    //   });

  }

  delete(person: Person) {
    console.log(`Successfully deleted person`);
    // this.peopleService.delete(person)
    //     .subscribe((person) => {
    //         this.people = _.remove(this.people, (p) => {
    //             return p.Id !== person.Id;
    //         });
    //         console.log(`successfully deleted person`);
    //     });
  }


  updateChart() {
    this.people = [...this.people];
    this.formatChartData();
  }

  changeYear(amount) {
    this.date.setFullYear(this.date.getFullYear() + amount);
    this.selectedYear = this.date.getFullYear();
    this.get(this.date);
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
    this.chart.chartLegend = false;
    this.chart.chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'WHO ATE ALL THE PIES?'
      }
    };
    this.chart.chartColors = this.colors.map((color) => {
      return {
        backgroundColor: 'rgba(215, 215, 215, 0.2)', // white fully transparent
        pointColor: color,
        borderColor: color
      };
    });
  }
}

