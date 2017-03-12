export class Person {
    Id: number;
    FullName: string;
    Weights: Weight[];
}

export class Weight {
    Id: number;
    Kg: number;
    Date: Date;
    PersonId: number;
}

export class Chart {
    chartData: any[];
    chartLabels: any[];
    chartOptions: Object;
    chartColors: any[];
    chartType: string;
}