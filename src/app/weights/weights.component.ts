import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { PeopleService } from '../people/people.service';
import { Person, Chart } from '../models';
import { ChartsModule } from 'ng2-charts';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-weights',
  templateUrl: './weights.component.html',
  styleUrls: ['./weights.component.css']
})
export class WeightsComponent implements OnInit {
  months: string[] = moment.monthsShort();
  date: Date = new Date();
  db: AngularFireDatabase;
  peopleChart: Person[];
  people: FirebaseListObservable<Person[]>;
  chart: Chart = new Chart();
  selectedYear: number = this.date.getFullYear();
  colors: string[] = ['red', 'blue', 'green', 'orange', 'pink', 'gold', 'purple', 'rose'];

  // constructor(private peopleService: PeopleService) { }
  constructor(db: AngularFireDatabase) {
    this.db = db;
  }

  ngOnInit() {
    // this.get(this.date);
    const itemObservable = this.db.object('/');
    itemObservable.set( {People:
       [
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
            // // 2016
            // { Id: 13, Kg: 70, Date: new Date('2016-01-31'), PersonId: 1 },
            // { Id: 14, Kg: 72, Date: new Date('2016-02-28'), PersonId: 1 },
            // { Id: 15, Kg: 71, Date: new Date('2016-03-31'), PersonId: 1 },
            // {Id: 16, Kg: 73, Date: new Date('2016-04-30'), PersonId: 1},
            // {Id: 17, Kg: 72, Date: new Date('2016-05-31'), PersonId: 1},
            // {Id: 18, Kg: 75, Date: new Date('2016-06-30'), PersonId: 1},
            // {Id: 19, Kg: 74, Date: new Date('2016-07-31'), PersonId: 1},
            // {Id: 20, Kg: 76, Date: new Date('2016-08-31'), PersonId: 1},
            // {Id: 21, Kg: 77, Date: new Date('2016-09-30'), PersonId: 1},
            // {Id: 22, Kg: 77, Date: new Date('2016-10-31'), PersonId: 1},
            // {Id: 23, Kg: 77, Date: new Date('2016-11-3'), PersonId: 1},
            // {Id: 24, Kg: 77, Date: new Date('2016-12-31'), PersonId: 1}
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
      ] }
    );
     this.get(this.date);
     this.updateChart();
  }

  get(date: Date) {
     this.db.list('/People').subscribe(p => this.peopleChart = p);
    // this.peopleService.get(date)
    //   .subscribe(people => {
    //     this.people = people;
    //     this.formatChartData();
    //   });
  }

  save() {
    console.log('People saved');
    // this.peopleService.put(this.people)
    //   .subscribe(people => {
    //   });
  }

  create() {
    console.log('New person created');
    // // const person = new Person();
    // const person = new Person();
    // this.peopleService.create(person, this.selectedYear)
    //   .subscribe(p => {
    //     this.people = [...this.people, person];
    //   });

  }

  delete(person: Person) {
    console.log(`Deleted person`);
    // this.peopleService.delete(person)
    //     .subscribe((person) => {
    //         this.people = _.remove(this.people, (p) => {
    //             return p.Id !== person.Id;
    //         });
    //         console.log(`successfully deleted person`);
    //     });
  }


  updateChart() {
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
    this.peopleChart.forEach((person) => {
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

